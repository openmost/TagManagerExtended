(function () {
  var initialised = {};

  return function (parameters, TagManager) {
    this.fire = function () {

      var pixelId = parameters.get('pixelId');
      var eventName = parameters.get('eventName');
      var eventParams = parameters.get('eventParameters');
      var userEmail = parameters.get('userEmail');

      if (!pixelId) {
        return;
      }

      // Load the Snap Pixel base library once.
      if (!window.snaptr) {
        (function (e, t, n) {
          if (e.snaptr) return;
          var a = e.snaptr = function () {
            a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments);
          };
          a.queue = [];
          var s = 'script';
          var r = t.createElement(s); r.async = !0; r.src = n;
          var u = t.getElementsByTagName(s)[0];
          u.parentNode.insertBefore(r, u);
        })(window, document, 'https://sc-static.net/scevent.min.js');
      }

      // Initialise the pixel once per ID (passing the email improves matching).
      if (!initialised[pixelId]) {
        initialised[pixelId] = true;
        if (userEmail) {
          snaptr('init', pixelId, { user_email: userEmail });
        } else {
          snaptr('init', pixelId);
        }
      }

      if (!eventName) {
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

      snaptr('track', eventName, paramsObject);
    };
  };
})();
