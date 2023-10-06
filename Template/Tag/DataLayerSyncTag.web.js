(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var dataLayerName = parameters.get("dataLayerName") ? parameters.get("dataLayerName") : "dataLayer";

      window[dataLayerName] = window[dataLayerName] || [];
      window._mtm = window._mtm || [];

      var syncDataLayer = function (array, callback) {
        array.push = function (e) {
          Array.prototype.push.call(array, e);
          callback(array);
        };
      };

      syncDataLayer(window[dataLayerName], function () {
        window._mtm.push(window[dataLayerName].at(-1));
      });
    };
  };
})();
