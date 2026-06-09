(function () {
  var initialised = {};

  return function (parameters, TagManager) {
    this.fire = function () {

      var tagId = parameters.get('tagId');
      var eventName = parameters.get('eventName');
      var customEventName = parameters.get('customEventName');
      var eventParams = parameters.get('eventParameters');
      var eventId = parameters.get('eventId');

      if (!tagId) {
        return;
      }

      // Load the Pinterest Tag base library once.
      if (!window.pintrk) {
        !function (e) {
          if (!window.pintrk) {
            window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments));
            };
            var n = window.pintrk;
            n.queue = []; n.version = '3.0';
            var t = document.createElement('script');
            t.async = !0; t.src = e;
            var r = document.getElementsByTagName('script')[0];
            r.parentNode.insertBefore(t, r);
          }
        }('https://s.pinimg.com/ct/core.js');
      }

      // Load the tag once per ID.
      if (!initialised[tagId]) {
        initialised[tagId] = true;
        pintrk('load', tagId);
      }

      var isCustom = eventName === 'custom';
      var name = isCustom ? customEventName : eventName;
      if (!name) {
        return;
      }

      // "pagevisit" maps to the base pintrk('page') call.
      if (name === 'pagevisit') {
        pintrk('page');
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
      // server-side through the Conversions API. It must be set INSIDE the event
      // data object: the 4th argument of pintrk('track', ...) is a callback, not
      // an options object, so an event_id passed there would be silently ignored.
      if (eventId) {
        paramsObject.event_id = eventId;
      }
      pintrk('track', name, paramsObject);
    };
  };
})();
