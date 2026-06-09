(function () {
  var loaded = false;

  return function (parameters, TagManager) {
    this.fire = function () {

      var websiteId = parameters.get('websiteId');
      var userEmail = parameters.get('userEmail');
      var userNickname = parameters.get('userNickname');

      if (!websiteId) {
        return;
      }

      window.$crisp = window.$crisp || [];

      // Load the Crisp chat widget once.
      if (!loaded) {
        loaded = true;
        window.CRISP_WEBSITE_ID = websiteId;
        var d = document;
        var s = d.createElement('script');
        s.src = 'https://client.crisp.chat/l.js';
        s.async = 1;
        d.getElementsByTagName('head')[0].appendChild(s);
      }

      // Pre-fill the visitor identity when available.
      if (userEmail) {
        window.$crisp.push(['set', 'user:email', [userEmail]]);
      }
      if (userNickname) {
        window.$crisp.push(['set', 'user:nickname', [userNickname]]);
      }
    };
  };
})();
