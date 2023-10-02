(function () {
    return function (parameters, TagManager) {
        this.fire = function () {

            var clientId = parameters.get("clientId");

            window.axeptioSettings = {
              clientId: clientId
            };

            (function(d, s) {
            var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
            e.async = true; e.src = "//static.axept.io/sdk.js";
            t.parentNode.insertBefore(e, t);
            })(document, "script");

        };
    };
})();
