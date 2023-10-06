(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var companyId = parameters.get("klaviyoCompanyId");

      var src = "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=";
      src += companyId;

      (function (d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true;
        e.type = "text/javascript";
        e.src = src;
        t.parentNode.insertBefore(e, t);
      })(document, "script");

    };
  };
})();
