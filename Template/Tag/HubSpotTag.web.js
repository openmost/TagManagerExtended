(function () {
  var loaded = {};

  return function (parameters, TagManager) {
    this.fire = function () {

      var portalId = parameters.get('portalId');
      var region = parameters.get('region') || 'na1';
      var email = parameters.get('email');
      var eventName = parameters.get('eventName');

      window._hsq = window._hsq || [];

      // Load the HubSpot tracking code once per portal.
      if (portalId && !loaded[portalId]) {
        loaded[portalId] = true;
        var host = region === 'eu1' ? 'js-eu1.hs-scripts.com' : 'js.hs-scripts.com';
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.defer = true;
        s.id = 'hs-script-loader';
        s.src = 'https://' + host + '/' + portalId + '.js';
        var f = document.getElementsByTagName('script')[0];
        f.parentNode.insertBefore(s, f);
      }

      // Identify the visitor so the pageview is associated to the contact.
      if (email) {
        window._hsq.push(['identify', { email: email }]);
      }

      // Send a custom behavioral event (requires Marketing Hub Enterprise).
      if (eventName) {
        window._hsq.push(['trackCustomBehavioralEvent', { name: eventName }]);
      } else {
        window._hsq.push(['trackPageView']);
      }
    };
  };
})();
