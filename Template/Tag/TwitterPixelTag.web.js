(function () {
  var configured = {};

  return function (parameters, TagManager) {
    this.fire = function () {

      var pixelId = parameters.get('pixelId');
      var eventId = parameters.get('eventId');
      var eventParams = parameters.get('eventParameters');

      if (!pixelId) {
        return;
      }

      // Load the X (Twitter) Universal Website Tag once.
      if (!window.twq) {
        !function (e, t, n, s, u, a) {
          e.twq || (s = e.twq = function () {
            s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
          }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0,
          u.src = 'https://static.ads-twitter.com/uwt.js',
          a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a));
        }(window, document, 'script');
      }

      // Configure the pixel once per ID. twq('config', ...) handles the base
      // page tracking on its own.
      if (!configured[pixelId]) {
        configured[pixelId] = true;
        twq('config', pixelId);
      }

      // Without an event ID this tag only loads/configures the base pixel.
      if (!eventId) {
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

      // The X pixel references conversion events by their event id (tw-xxxx-xxxx),
      // configured in the X Ads events manager.
      twq('event', eventId, paramsObject);
    };
  };
})();
