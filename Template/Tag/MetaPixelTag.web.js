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

      // Load the Meta Pixel base library once.
      if (!window.fbq) {
        !function (f, b, e, v, n, t, s) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
          t = b.createElement(e); t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      }

      // Initialise the pixel once per ID.
      if (!initialised[pixelId]) {
        initialised[pixelId] = true;
        fbq('init', pixelId);
      }

      var isCustom = eventName === 'custom';
      var name = isCustom ? customEventName : eventName;
      if (!name) {
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
      // server-side through the Conversions API (CAPI).
      var options = eventId ? { eventID: eventId } : undefined;
      var method = isCustom ? 'trackCustom' : 'track';

      if (options) {
        fbq(method, name, paramsObject, options);
      } else {
        fbq(method, name, paramsObject);
      }
    };
  };
})();
