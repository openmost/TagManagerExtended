(function () {
    return function (parameters, TagManager) {

        this.get = function () {
            var key = parameters.get('key');

            if (!key) {
                return;
            }

            try {
                if (typeof window.sessionStorage === 'undefined') {
                    return;
                }

                var value = window.sessionStorage.getItem(key);

                if (value === null) {
                    return;
                }

                // Try to parse JSON values
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            } catch (e) {
                // sessionStorage might not be accessible (private browsing, etc.)
                return;
            }
        };
    };
})();
