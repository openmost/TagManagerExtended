(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var clientId = parameters.get("clientId");

      window.axeptioSettings = {
        clientId: clientId
      };

      (function (d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true;
        e.src = "//static.axept.io/sdk.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");

      // Support Matomo Tag Manager
      // https://support.axeptio.eu/hc/fr/articles/8610881942545-Int%C3%A9gration-Matomo-Tag-Manager
      window._axcb = window._axcb || [];
      window._mtm = window._mtm || [];
      window._axcb.push(function (sdk) {
        sdk.on("cookies:complete", function (choices) {
          var axeptio_Matomo = [];
          for (var vendor in choices) {
            if (vendor != "$$completed" && choices[vendor] == true) {
              _mtm.push({event: `axeptio_activate_${vendor}`});
              axeptio_Matomo.push(vendor);
            }
          }
          _mtm.push({"axeptio_Matomo": axeptio_Matomo});
        });
      });

    };
  };
})();
