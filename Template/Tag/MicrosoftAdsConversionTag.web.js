(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var eventAction = parameters.get('eventAction');
      var eventCategory = parameters.get('eventCategory');
      var eventLabel = parameters.get('eventLabel');
      var eventValue = parameters.get('eventValue');
      var revenueValue = parameters.get('revenueValue');
      var currency = parameters.get('currency');
      var eventParams = parameters.get('eventParameters');

      // This tag requires the "Microsoft Advertising (Bing UET)" base tag to be
      // configured on the page so that window.uetq / UET is available.
      window.uetq = window.uetq || [];

      var data = {};
      if (eventCategory) data.event_category = eventCategory;
      if (eventLabel) data.event_label = eventLabel;
      if (eventValue) data.event_value = eventValue;
      if (revenueValue) data.revenue_value = revenueValue;
      if (currency) data.currency = currency;

      if (eventParams && eventParams.forEach) {
        eventParams.forEach(function (param) {
          if (param.parameter) {
            data[param.parameter] = param.value;
          }
        });
      }

      window.uetq.push('event', eventAction || '', data);
    };
  };
})();
