(function () {
  var initialised = {};

  return function (parameters, TagManager) {
    this.fire = function () {

      var pixelId = parameters.get('pixelId');
      var eventName = parameters.get('eventName');
      var customEventName = parameters.get('customEventName');
      var eventParams = parameters.get('eventParameters');
      var eventId = parameters.get('eventId');

      if (!pixelId) {
        return;
      }

      // Load the TikTok Pixel base library once.
      if (!window.ttq) {
        !function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = w[t] = w[t] || [];
          ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
          ttq.setAndDefer = function (e, n) {
            e[n] = function () { e.push([n].concat(Array.prototype.slice.call(arguments, 0))); };
          };
          for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
          ttq.instance = function (e) {
            for (var n = ttq._i[e] || [], i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(n, ttq.methods[i]);
            return n;
          };
          ttq.load = function (e, n) {
            var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
            ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r;
            ttq._t = ttq._t || {}; ttq._t[e] = +new Date();
            ttq._o = ttq._o || {}; ttq._o[e] = n || {};
            var s = d.createElement('script'); s.type = 'text/javascript'; s.async = !0;
            s.src = r + '?sdkid=' + e + '&lib=' + t;
            var a = d.getElementsByTagName('script')[0];
            a.parentNode.insertBefore(s, a);
          };
        }(window, document, 'ttq');
      }

      // Load the pixel once per ID.
      if (!initialised[pixelId]) {
        initialised[pixelId] = true;
        ttq.load(pixelId);
      }

      var isCustom = eventName === 'custom';
      var name = isCustom ? customEventName : eventName;
      if (!name) {
        return;
      }

      // PageView uses the dedicated ttq.page() method.
      if (name === 'PageView') {
        ttq.page();
        return;
      }

      var paramsObject = {};
      if (eventParams && eventParams.forEach) {
        eventParams.forEach(function (param) {
          if (param.parameter) {
            paramsObject[param.parameter] = param.value;
          }
        });
      }

      // event_id deduplicates this browser event with the same event sent
      // server-side through the Events API.
      if (eventId) {
        ttq.track(name, paramsObject, { event_id: eventId });
      } else {
        ttq.track(name, paramsObject);
      }
    };
  };
})();
