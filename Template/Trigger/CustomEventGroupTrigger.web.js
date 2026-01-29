(function () {
    return function (parameters, TagManager) {

        var eventNamesParam = parameters.get('eventNames') || [];
        var fireOnce = parameters.get('fireOnce');

        // Parse event names from array of objects [{eventName: 'event1'}, {eventName: 'event2'}]
        var eventNames = [];
        if (TagManager.utils.isArray(eventNamesParam)) {
            for (var i = 0; i < eventNamesParam.length; i++) {
                var item = eventNamesParam[i];
                if (item && item.eventName && typeof item.eventName === 'string' && item.eventName.trim()) {
                    eventNames.push(item.eventName.trim());
                }
            }
        }

        // Track which events have been received
        var receivedEvents = {};
        var hasFired = false;

        // Initialize tracking object
        for (var i = 0; i < eventNames.length; i++) {
            receivedEvents[eventNames[i]] = false;
        }

        function checkEvent(value) {
            if (!TagManager.utils.isObject(value) || !('event' in value)) {
                return false;
            }

            var eventName = value.event;

            // Check if this event is one we're waiting for
            if (eventName in receivedEvents) {
                receivedEvents[eventName] = true;
                return true;
            }

            return false;
        }

        function allEventsReceived() {
            for (var name in receivedEvents) {
                if (receivedEvents.hasOwnProperty(name) && !receivedEvents[name]) {
                    return false;
                }
            }
            return true;
        }

        function resetTracking() {
            for (var name in receivedEvents) {
                if (receivedEvents.hasOwnProperty(name)) {
                    receivedEvents[name] = false;
                }
            }
        }

        function getReceivedEventsList() {
            var received = [];
            for (var name in receivedEvents) {
                if (receivedEvents.hasOwnProperty(name) && receivedEvents[name]) {
                    received.push(name);
                }
            }
            return received;
        }

        // Catch events that happened before container setup
        var missedEvents = [];
        var index = parameters.container.dataLayer.on(function (value) {
            if (checkEvent(value)) {
                missedEvents.push(value.event);
            }
        });

        this.setUp = function (triggerEvent) {
            // Stop listening to pre-setup events
            parameters.container.dataLayer.off(index);

            // Process missed events
            for (var i = 0; i < missedEvents.length; i++) {
                receivedEvents[missedEvents[i]] = true;
            }

            // Check if all events were already received
            if (allEventsReceived() && !hasFired) {
                hasFired = true;
                triggerEvent({
                    event: 'mtm.CustomEventGroup',
                    'mtm.customEventGroupEvents': getReceivedEventsList()
                });

                if (!fireOnce) {
                    resetTracking();
                    hasFired = false;
                }
            }

            // Listen for future events
            parameters.container.dataLayer.on(function (value) {
                if (fireOnce && hasFired) {
                    return;
                }

                if (checkEvent(value) && allEventsReceived()) {
                    hasFired = true;
                    triggerEvent({
                        event: 'mtm.CustomEventGroup',
                        'mtm.customEventGroupEvents': getReceivedEventsList()
                    });

                    if (!fireOnce) {
                        resetTracking();
                        hasFired = false;
                    }
                }
            });
        };
    };
})();
