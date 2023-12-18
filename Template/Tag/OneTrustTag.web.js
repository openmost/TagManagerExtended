(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var domain = parameters.get("domain");

      (function (d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.type = "text/javascript";
        e.src = "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js";
        e.dataset.domainScript = domain;
        t.parentNode.insertBefore(e, t);
      })(document, "script");

    };
  };
})();
