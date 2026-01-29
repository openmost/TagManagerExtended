(function () {
    return function (parameters, TagManager) {

        var pattern = parameters.get('eventNamePattern') || '.*';
        var regex;

        try {
            regex = new RegExp(pattern);
        } catch (e) {
            // Invalid regex, fall back to match all
            regex = new RegExp('.*');
        }

        /**
         * Check if the dataLayer push matches our regex pattern.
         * We match any object with an 'event' property that:
         * 1. Is not a Matomo internal event (mtm.*)
         * 2. Matches the user-defined regex pattern
         */
        function isMatchingEvent(value) {
            if (!TagManager.utils.isObject(value)) {
                return false;
            }

            if (!('event' in value)) {
                return false;
            }

            var eventName = value.event;

            // Must be a string
            if (typeof eventName !== 'string') {
                return false;
            }

            // Skip Matomo Tag Manager internal events (they start with 'mtm.')
            if (eventName.indexOf('mtm.') === 0) {
                return false;
            }

            // Test against the regex pattern
            return regex.test(eventName);
        }

        // Catch all events that were triggered before the container was fully set up
        var missedEvents = [];
        var index = parameters.container.dataLayer.on(function (value) {
            if (isMatchingEvent(value)) {
                missedEvents.push(value.event);
            }
        });

        this.setUp = function (triggerEvent) {
            // Stop listening to the initial listener
            parameters.container.dataLayer.off(index);

            // Replay any missed events
            for (var i = 0; i < missedEvents.length; i++) {
                triggerEvent({
                    event: 'mtm.RegexEvent',
                    'mtm.customEventMatch': missedEvents[i]
                });
            }

            // Listen for all future dataLayer pushes
            parameters.container.dataLayer.on(function (value) {
                if (isMatchingEvent(value)) {
                    triggerEvent({
                        event: 'mtm.RegexEvent',
                        'mtm.customEventMatch': value.event
                    });
                }
            });
        };
    };
})();
