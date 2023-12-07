(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var webhook = parameters.get("webhook");
      var message = parameters.get("message");
      var blockId = Math.random() * 1000000;

      var payload = JSON.stringify({
        "text": "Danny Torrence left a 1 star review for your property.",
        "blocks": [
          {
            "type": "section",
            "block_id": blockId.toString(),
            "text": {
              "type": "mrkdwn",
              "text": message.toString()
            }
          }
        ]
      });

      if (webhook && message) {
        fetch(webhook, {
          method: "POST",
          body: payload
        });
      }

    };
  };
})();
