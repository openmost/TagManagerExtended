(function () {
    return function (parameters, TagManager) {
        this.fire = function () {

          (function (d, s) {
            var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
            e.type = "text/javascript";
            e.src = "https://scripts.simpleanalyticscdn.com/latest.js";
            e.async = true;
            e.defer = true;
            t.parentNode.insertBefore(e, t);
          })(document, "script");

        };
    };
})();
