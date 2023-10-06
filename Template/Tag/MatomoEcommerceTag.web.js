(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var trackingType = parameters.get('matomoEcommerceTrackingType');
      var ecommerce = parameters.get('matomoEcommerceDataLayerVariable');
      window._paq = window._paq || [];

      if (trackingType === 'view_item') {
        ecommerce.items.forEach(item => {
          _paq.push(['setEcommerceView',
            item.item_id,
            item.item_name,
            item.item_category,
            item.price
          ]);
        });
        //_paq.push(['trackPageView']);
      }

      if (trackingType === 'view_item_list') {
        _paq.push(['setEcommerceView',
          false,
          false,
          ecommerce.item_list_name
        ]);
        //_paq.push(['trackPageView']);
      }

      if (trackingType === 'update_cart') {
        ecommerce.items.forEach(item => {
          _paq.push(['addEcommerceItem',
            item.item_id,
            item.item_name,
            item.item_category,
            item.price,
            (item.quantity || 1)
          ]);
        });

        _paq.push(['trackEcommerceCartUpdate', ecommerce.value]);
      }

      if (trackingType === 'purchase') {
        ecommerce.items.forEach(item => {
          _paq.push(['addEcommerceItem',
            item.item_id,
            item.item_name,
            item.item_category,
            item.price,
            (item.quantity || 1)
          ]);
        });

        window._paq.push(['trackEcommerceOrder',
          ecommerce.transaction_id,
          ecommerce.value,
          (ecommerce.order_sub_total || 0),
          (ecommerce.tax || 0),
          (ecommerce.shipping || 0),
          (ecommerce.discount || false)
        ]);
      }

    };
  };
})();
