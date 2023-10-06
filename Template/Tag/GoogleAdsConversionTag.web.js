(function () {
    return function (parameters, TagManager) {
        this.fire = function () {

            var conversionId = parameters.get("googleAdsConversionId");
            var conversionLabel = parameters.get("googleAdsConversionLabel");
            var value = parameters.get("googleAdsConversionValue");
            var currency = parameters.get("googleAdsConversionCurrency");

            var sendTo = conversionId + "/" + conversionLabel;

            gtag("event", "conversion", {
              "send_to": sendTo,
              "value": value,
              "currency": currency
            });

        };
    };
})();
