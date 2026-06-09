(function () {
  var initialised = {};

  return function (parameters, TagManager) {
    this.fire = function () {

      var pixelId = parameters.get('pixelId');
      var eventName = parameters.get('eventName');
      var customEventName = parameters.get('customEventName');
      var eventParams = parameters.get('eventParameters');

      if (!pixelId) {
        return;
      }

      // Load the Reddit Pixel base library once.
      if (!window.rdt) {
        !function (w, d) {
          if (!w.rdt) {
            var p = w.rdt = function () {
              p.sendEvent ? p.sendEvent.apply(p, arguments) : p.callQueue.push(arguments);
            };
            p.callQueue = [];
            var t = d.createElement('script');
            t.src = 'https://www.redditstatic.com/ads/pixel.js'; t.async = !0;
            var s = d.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(t, s);
          }
        }(window, document);
      }

      // Initialise the pixel once per ID.
      if (!initialised[pixelId]) {
        initialised[pixelId] = true;
        rdt('init', pixelId);
      }

      var isCustom = eventName === 'custom';
      if (isCustom && !customEventName) {
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

      // Reddit custom events are sent through the "Custom" event with a
      // customEventName property.
      if (isCustom) {
        paramsObject.customEventName = customEventName;
        rdt('track', 'Custom', paramsObject);
      } else {
        rdt('track', eventName, paramsObject);
      }
    };
  };
})();
