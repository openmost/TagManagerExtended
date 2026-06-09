(function () {
  var initialised = {};

  return function (parameters, TagManager) {
    this.fire = function () {

      var conversionId = parameters.get('conversionId');
      var partnerId = parameters.get('partnerId');

      // Load the LinkedIn Insight Tag when a partner ID is supplied and it is not
      // already present. Leave the partner ID empty if the base 'LinkedIn Insight'
      // tag already loads it on the page.
      if (partnerId && !initialised[partnerId]) {
        initialised[partnerId] = true;
        window._linkedin_partner_id = partnerId;
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(partnerId);
        if (!window.lintrk) {
          window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
          window.lintrk.q = [];
          var s = document.getElementsByTagName('script')[0];
          var b = document.createElement('script');
          b.type = 'text/javascript'; b.async = true;
          b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
          s.parentNode.insertBefore(b, s);
        }
      }

      if (!conversionId || !window.lintrk) {
        return;
      }

      window.lintrk('track', { conversion_id: Number(conversionId) });
    };
  };
})();
