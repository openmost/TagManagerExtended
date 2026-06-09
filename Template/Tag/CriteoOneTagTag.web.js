(function () {
  var libLoaded = false;

  return function (parameters, TagManager) {
    this.fire = function () {

      var accountId = parameters.get('accountId');
      var eventType = parameters.get('eventType');
      var email = parameters.get('email');
      var eventParams = parameters.get('eventParameters');

      window.criteo_q = window.criteo_q || [];

      // Load the Criteo OneTag library once.
      if (!libLoaded) {
        libLoaded = true;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        // Criteo's current "dynamic loader" carries the account id in the URL.
        s.src = 'https://dynamic.criteo.com/js/ld/ld.js?a=' + encodeURIComponent(accountId);
        document.getElementsByTagName('head')[0].appendChild(s);
      }

      var deviceType = /iPad/.test(navigator.userAgent)
        ? 't'
        : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent)
          ? 'm'
          : 'd';

      var queue = [
        { event: 'setAccount', account: accountId },
        { event: 'setSiteType', type: deviceType }
      ];

      // Plain-text email must be sent by omitting hash_method (there is no
      // 'none' value). Provide an already MD5/SHA256-hashed email upstream if
      // you need hashing.
      if (email) {
        queue.push({ event: 'setEmail', email: email });
      }

      // Build the tracking event from the key/value list.
      var trackEvent = { event: eventType };
      if (eventParams && eventParams.forEach) {
        eventParams.forEach(function (param) {
          if (param.parameter) {
            trackEvent[param.parameter] = param.value;
          }
        });
      }
      queue.push(trackEvent);

      window.criteo_q.push.apply(window.criteo_q, queue);
    };
  };
})();
