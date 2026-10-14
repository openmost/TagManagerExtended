(function () {
  var initialised = {};

  var EVENT_TYPES = {
    page_viewed: 'contents',
    contents_viewed: 'contents',
    items_added: 'contents',
    checkout_started: 'contents',
    order_created: 'contents',
    lead_created: 'customer_action',
    registration_completed: 'customer_action',
    appointment_scheduled: 'customer_action',
    subscription_created: 'plan_enrollment',
    trial_started: 'plan_enrollment',
    custom: 'custom'
  };

  var EVENTS_WITH_AMOUNT = {
    page_viewed: true,
    contents_viewed: true,
    items_added: true,
    checkout_started: true,
    order_created: true,
    appointment_scheduled: true,
    subscription_created: true,
    custom: true
  };

  var EVENTS_WITH_PLAN = { subscription_created: true, trial_started: true, custom: true };

  var CUSTOM_EVENT_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9_-]{0,62}[a-z0-9])?$/;
  var SHA256_PATTERN = /^[a-f0-9]{64}$/i;

  function isEmpty(value) {
    return value === undefined || value === null || value === '';
  }

  function isTruthy(value) {
    if (value === true || value === 1) {
      return true;
    }
    return ['true', '1', 'yes', 'granted', 'accepted', 'allow', 'allowed'].indexOf(String(value).trim().toLowerCase()) !== -1;
  }

  function toInteger(value) {
    if (isEmpty(value)) {
      return undefined;
    }
    var number = parseFloat(String(value).replace(',', '.'));
    return isNaN(number) ? undefined : Math.round(number);
  }

  // The pixel only accepts integers. Decimal amounts are converted to the
  // smallest currency unit, honouring zero and three decimal currencies.
  function toMinorUnits(value, currency, amountFormat) {
    if (isEmpty(value)) {
      return undefined;
    }
    var number = parseFloat(String(value).replace(',', '.'));
    if (isNaN(number)) {
      return undefined;
    }
    if (amountFormat === 'minor') {
      return Math.round(number);
    }
    var digits = 2;
    if (currency && window.Intl && Intl.NumberFormat) {
      try {
        digits = new Intl.NumberFormat('en', { style: 'currency', currency: currency }).resolvedOptions().maximumFractionDigits;
      } catch (e) {
        digits = 2;
      }
    }
    return Math.round(number * Math.pow(10, digits));
  }

  function normaliseCurrency(value) {
    return isEmpty(value) ? undefined : String(value).trim().toUpperCase();
  }

  function compact(object) {
    var result = {};
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && !isEmpty(object[key])) {
        result[key] = object[key];
      }
    }
    return result;
  }

  function readItems(value) {
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return [];
      }
    }
    if (value && !Array.isArray(value) && Array.isArray(value.items)) {
      value = value.items;
    }
    return Array.isArray(value) ? value : [];
  }

  function mapItem(item, format, currency, amountFormat) {
    if (!item || typeof item !== 'object') {
      return null;
    }
    var itemCurrency = normaliseCurrency(item.currency) || currency;
    var mapped;
    if (format === 'ga4') {
      mapped = {
        id: item.item_id,
        name: item.item_name,
        content_type: 'product',
        quantity: toInteger(item.quantity),
        amount: toMinorUnits(item.price, itemCurrency, amountFormat),
        currency: item.price !== undefined ? itemCurrency : undefined
      };
    } else if (format === 'matomo') {
      mapped = {
        id: item.sku,
        name: item.name,
        content_type: 'product',
        quantity: toInteger(item.quantity),
        amount: toMinorUnits(item.price, itemCurrency, amountFormat),
        currency: item.price !== undefined ? itemCurrency : undefined
      };
    } else {
      mapped = {
        id: item.id,
        name: item.name,
        content_type: item.content_type,
        quantity: toInteger(item.quantity),
        amount: toInteger(item.amount),
        currency: normaliseCurrency(item.currency)
      };
    }
    if (!isEmpty(mapped.id)) {
      mapped.id = String(mapped.id);
    }
    mapped = compact(mapped);
    return Object.keys(mapped).length ? mapped : null;
  }

  function sha256(value) {
    var bytes = new TextEncoder().encode(value);
    return window.crypto.subtle.digest('SHA-256', bytes).then(function (buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
        return ('0' + byte.toString(16)).slice(-2);
      }).join('');
    });
  }

  var NORMALISERS = {
    email: function (value) {
      return value.trim().toLowerCase();
    },
    phone: function (value) {
      var digits = value.replace(/\D/g, '').replace(/^0+/, '');
      return digits.length >= 8 && digits.length <= 15 ? digits : '';
    },
    externalId: function (value) {
      return value.trim();
    },
    name: function (value) {
      return value.toLowerCase().replace(/[\s!-\/:-@\[-`{-~]/g, '');
    }
  };

  // Resolves to the hashed value, or to undefined when it cannot be hashed.
  function hashIdentifier(value, normaliser, log) {
    if (isEmpty(value)) {
      return Promise.resolve(undefined);
    }
    value = String(value);
    if (SHA256_PATTERN.test(value.trim())) {
      return Promise.resolve(value.trim().toLowerCase());
    }
    var normalised = NORMALISERS[normaliser](value);
    if (!normalised) {
      return Promise.resolve(undefined);
    }
    if (!window.crypto || !window.crypto.subtle || !window.TextEncoder) {
      log('SHA-256 is not available on this page (HTTPS required), the ' + normaliser + ' identifier was not sent.');
      return Promise.resolve(undefined);
    }
    return sha256(normalised).catch(function () {
      return undefined;
    });
  }

  function buildUser(parameters, log) {
    var location = compact({
      country: isEmpty(parameters.get('userCountry')) ? undefined : String(parameters.get('userCountry')).trim(),
      city: isEmpty(parameters.get('userCity')) ? undefined : String(parameters.get('userCity')).trim().slice(0, 128),
      region: isEmpty(parameters.get('userRegion')) ? undefined : String(parameters.get('userRegion')).trim().slice(0, 128),
      postal_code: isEmpty(parameters.get('userPostalCode')) ? undefined : String(parameters.get('userPostalCode')).trim().slice(0, 32)
    });

    return Promise.all([
      hashIdentifier(parameters.get('userEmail'), 'email', log),
      hashIdentifier(parameters.get('userPhone'), 'phone', log),
      hashIdentifier(parameters.get('userExternalId'), 'externalId', log),
      hashIdentifier(parameters.get('userFirstName'), 'name', log),
      hashIdentifier(parameters.get('userLastName'), 'name', log)
    ]).then(function (hashes) {
      var user = compact({
        email_sha256: hashes[0],
        phone_number_sha256: hashes[1],
        external_id_sha256: hashes[2],
        first_name_sha256: hashes[3],
        last_name_sha256: hashes[4]
      });
      for (var key in location) {
        user[key] = location[key];
      }
      return user;
    });
  }

  return function (parameters, TagManager) {
    this.fire = function () {

      var pixelId = parameters.get('pixelId');
      var eventName = parameters.get('eventName');
      var debug = !!parameters.get('debug');

      var log = function (message) {
        if (debug && window.console) {
          console.warn('[ChatGPT Ads Pixel] ' + message);
        }
      };

      if (!pixelId || !EVENT_TYPES[eventName]) {
        return;
      }

      // Load the ChatGPT Ads Measurement Pixel loader stub once.
      if (!window.oaiq) {
        !function (w, d, s, u) {
          if (w.oaiq) return;
          var q = function () { q.q.push(arguments); };
          q.q = [];
          w.oaiq = q;
          var j = d.createElement(s); j.async = 1; j.src = u;
          var f = d.getElementsByTagName(s)[0];
          f.parentNode.insertBefore(j, f);
        }(window, document, 'script', 'https://bzrcdn.openai.com/sdk/oaiq.min.js');
      }

      // Consent must be set before init so a denial blocks every ping.
      var consentMode = parameters.get('consentMode');
      if (consentMode === 'granted') {
        oaiq('consent', true);
      } else if (consentMode === 'denied') {
        oaiq('consent', false);
      } else if (consentMode === 'variable') {
        oaiq('consent', isTruthy(parameters.get('consentValue')));
      }

      if (!initialised[pixelId]) {
        initialised[pixelId] = true;
        oaiq('init', { pixelId: pixelId, debug: debug });
      }

      var isCustom = eventName === 'custom';
      var options = {};

      if (isCustom) {
        var customEventName = String(parameters.get('customEventName') || '').trim().toLowerCase();
        if (!CUSTOM_EVENT_NAME_PATTERN.test(customEventName) || EVENT_TYPES[customEventName]) {
          log('Invalid custom event name "' + customEventName + '": 1 to 64 lowercase letters, digits, "_" or "-", starting and ending with a letter or digit, and not a standard event name.');
          return;
        }
        options.custom_event_name = customEventName;
      }

      var eventId = parameters.get('eventId');
      if (!isEmpty(eventId)) {
        options.event_id = String(eventId);
      }
      if (parameters.get('optOut')) {
        options.opt_out = true;
      }

      var type = EVENT_TYPES[eventName];
      var data = { type: type };
      var amountFormat = parameters.get('amountFormat');
      var currency = normaliseCurrency(parameters.get('currency'));

      if (EVENTS_WITH_AMOUNT[eventName]) {
        var amount = toMinorUnits(parameters.get('amount'), currency, amountFormat);
        if (amount !== undefined) {
          data.amount = amount;
          if (currency) {
            data.currency = currency;
          }
        }
      }

      if (EVENTS_WITH_PLAN[eventName] && !isEmpty(parameters.get('planId'))) {
        data.plan_id = String(parameters.get('planId'));
      }

      if (type === 'contents' || isCustom) {
        var contentsSource = parameters.get('contentsSource');
        var contents = [];
        if (contentsSource === 'single') {
          var single = mapItem({
            id: parameters.get('contentId'),
            name: parameters.get('contentName'),
            content_type: parameters.get('contentType'),
            quantity: parameters.get('contentQuantity'),
            amount: toMinorUnits(parameters.get('contentAmount'), currency, amountFormat),
            currency: isEmpty(parameters.get('contentAmount')) ? undefined : currency
          }, 'openai', currency, amountFormat);
          if (single) {
            contents.push(single);
          }
        } else if (contentsSource === 'variable') {
          var format = parameters.get('contentsFormat');
          readItems(parameters.get('contentsVariable')).forEach(function (item) {
            var mapped = mapItem(item, format, currency, amountFormat);
            if (mapped) {
              contents.push(mapped);
            }
          });
        }
        if (contents.length) {
          data.contents = contents;
        }
      }

      var measure = function () {
        if (Object.keys(options).length) {
          oaiq('measure', eventName, data, options);
        } else {
          oaiq('measure', eventName, data);
        }
      };

      if (!parameters.get('sendUserData')) {
        measure();
        return;
      }

      // Hashing is asynchronous, the event is sent once user data has been
      // added through a second init call, as the pixel documentation allows.
      buildUser(parameters, log).then(function (user) {
        if (Object.keys(user).length) {
          oaiq('init', { pixelId: pixelId, debug: debug, user: user });
        }
        measure();
      }, measure);
    };
  };
})();
