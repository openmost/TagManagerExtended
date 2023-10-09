(function () {
    return function (parameters, TagManager) {
        this.fire = function () {


          var accountId = parameters.get('accountId');


          (function (c, a, d, b, e) {
            c[b] = c[b] || [];
            c = a.getElementsByTagName(d)[0];
            a = a.createElement(d);
            b = "dataLayer" != b ? "&l=" + b : "";
            a.async = !0;
            a.src = "https://assets.listenlayer.com/datalayer.min.js?id=" + e + b;
            c.parentNode.insertBefore(a, c)
          })(window, document, "script", "dataLayer", accountId);


        };
    };
})();
