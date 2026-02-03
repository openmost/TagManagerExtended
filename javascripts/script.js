/******/ (function() { // webpackBootstrap
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
window.addEventListener('DOMContentLoaded', function () {
  // Select the node to be observed
  var targetNode = document.querySelector('.tagManagerManageEdit');
  if (targetNode) {
    var editorFromTextArea = function editorFromTextArea(textarea) {
      textarea.rows = 8;
      textarea.spellcheck = false;
    };
    // Options for the observer (which mutations to observe)
    var config = {
      attributes: true,
      childList: true,
      subtree: true
    };

    // Callback function to execute when mutations are observed
    var callback = function callback(mutationList, observer) {
      var _iterator = _createForOfIteratorHelper(mutationList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function (node) {
              if (node.nodeType === 1) {
                var textarea = node.querySelector("#customHtml");
                if (textarea) {
                  editorFromTextArea(textarea);
                }
              }
            });
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }

  // Bulk Actions Feature
  var BulkActionsManager = /*#__PURE__*/function () {
    function BulkActionsManager() {
      _classCallCheck(this, BulkActionsManager);
      this.selectedItems = new Map();
      this.currentEntityType = null;
      this.initialized = new Set();
      this.observerStarted = false;
    }
    return _createClass(BulkActionsManager, [{
      key: "init",
      value: function init() {
        var _this = this;
        var listContainer = document.querySelector('.tagManagerManageList');
        if (!listContainer) return;
        var config = {
          attributes: true,
          childList: true,
          subtree: true
        };
        var callback = function callback(mutationList) {
          var _iterator2 = _createForOfIteratorHelper(mutationList),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var mutation = _step2.value;
              if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function (node) {
                  if (node.nodeType === 1) {
                    _this.checkAndInitialize(node);
                  }
                });
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        };
        var observer = new MutationObserver(callback);
        observer.observe(listContainer, config);
        this.observerStarted = true;

        // Initial check for already existing lists
        this.checkAndInitialize(listContainer);
      }
    }, {
      key: "checkAndInitialize",
      value: function checkAndInitialize(node) {
        var lists = [{
          selector: '.tagManagerTagList',
          type: 'tag',
          rowClass: 'tags',
          idPrefix: 'tag'
        }, {
          selector: '.tagManagerTriggerList',
          type: 'trigger',
          rowClass: 'triggers',
          idPrefix: 'trigger'
        }, {
          selector: '.tagManagerVariableList',
          type: 'variable',
          rowClass: 'variables',
          idPrefix: 'variable'
        }];
        for (var _i = 0, _lists = lists; _i < _lists.length; _i++) {
          var list = _lists[_i];
          var container = node.matches && node.matches(list.selector) ? node : node.querySelector(list.selector);
          if (container && !this.initialized.has(list.type)) {
            // Check if user has write access (tableActionBar present means they can edit)
            var hasWriteAccess = container.querySelector('.tableActionBar');
            if (hasWriteAccess) {
              this.initializeList(container, list);
              this.initialized.add(list.type);
            }
          }
        }
      }
    }, {
      key: "initializeList",
      value: function initializeList(container, listConfig) {
        var _this2 = this;
        var table = container.querySelector('table');
        if (!table) return;

        // Function to check if table has data rows
        var hasDataRows = function hasDataRows() {
          var rows = table.querySelectorAll("tbody tr.".concat(listConfig.rowClass));
          return rows.length > 0;
        };

        // Function to do the actual initialization
        var doInit = function doInit() {
          _this2.injectToolbar(container, listConfig.type);
          _this2.injectCheckboxes(table, listConfig);
          _this2.currentEntityType = listConfig.type;

          // Watch for table body changes (when Vue re-renders rows)
          _this2.observeTableChanges(table, listConfig);
        };

        // Wait for table to have data rows, with retry mechanism
        var _waitForRows = function waitForRows() {
          var attempts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          if (hasDataRows()) {
            doInit();
          } else if (attempts < 20) {
            // Retry up to 20 times (2 seconds total)
            setTimeout(function () {
              return _waitForRows(attempts + 1);
            }, 100);
          } else {
            // After timeout, initialize anyway (rows might be empty)
            doInit();
          }
        };

        // Start waiting for rows
        setTimeout(function () {
          return _waitForRows();
        }, 100);
      }
    }, {
      key: "observeTableChanges",
      value: function observeTableChanges(table, listConfig) {
        var _this3 = this;
        var tbody = table.querySelector('tbody');
        if (!tbody) return;

        // Store observer reference to avoid duplicates
        if (table._tmeObserver) return;
        var observer = new MutationObserver(function (mutations) {
          var needsUpdate = false;
          mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1 && node.matches && node.matches("tr.".concat(listConfig.rowClass))) {
                  needsUpdate = true;
                }
              });
            }
          });
          if (needsUpdate) {
            // Re-inject checkboxes for new rows
            setTimeout(function () {
              _this3.injectCheckboxes(table, listConfig);
            }, 50);
          }
        });
        observer.observe(tbody, {
          childList: true,
          subtree: true
        });
        table._tmeObserver = observer;
      }
    }, {
      key: "injectToolbar",
      value: function injectToolbar(container, entityType) {
        // Check if toolbar already exists
        if (container.querySelector('.tme-bulk-actions')) return;
        var toolbar = document.createElement('div');
        toolbar.className = 'tme-bulk-actions';
        toolbar.innerHTML = this.getToolbarHTML(entityType);

        // Insert before the table
        var table = container.querySelector('table');
        if (table) {
          table.parentNode.insertBefore(toolbar, table);
        }
        this.attachToolbarEvents(toolbar, entityType);
      }
    }, {
      key: "getToolbarHTML",
      value: function getToolbarHTML(entityType) {
        var translations = this.getTranslations();
        var actionsHTML = "\n        <button class=\"btn btn-flat tme-bulk-btn tme-bulk-delete\" disabled>\n          <span class=\"icon-delete\"></span> ".concat(translations.bulkDelete, "\n        </button>\n      ");

        // Only tags have pause/resume
        if (entityType === 'tag') {
          actionsHTML = "\n          <button class=\"btn btn-flat tme-bulk-btn tme-bulk-pause\" disabled>\n            <span class=\"icon-pause\"></span> ".concat(translations.bulkPause, "\n          </button>\n          <button class=\"btn btn-flat tme-bulk-btn tme-bulk-resume\" disabled>\n            <span class=\"icon-play\"></span> ").concat(translations.bulkResume, "\n          </button>\n        ") + actionsHTML;
        }
        return "\n        <div class=\"tme-bulk-select-controls\">\n          <label class=\"tme-select-all-label\">\n            <input type=\"checkbox\" class=\"tme-select-all\" />\n            <span>".concat(translations.selectAll, "</span>\n          </label>\n          <span class=\"tme-selection-count\"></span>\n        </div>\n        <div class=\"tme-bulk-buttons\">\n          ").concat(actionsHTML, "\n        </div>\n      ");
      }
    }, {
      key: "getTranslations",
      value: function getTranslations() {
        // Use Matomo's translation system - translations are stored in piwik.translations object
        var translate = function translate(key, fallback) {
          if (window.piwik && window.piwik.translations && window.piwik.translations[key]) {
            return window.piwik.translations[key];
          }
          // Try _pk_translate function if available
          if (typeof window._pk_translate === 'function') {
            var translated = window._pk_translate(key);
            if (translated !== key) {
              return translated;
            }
          }
          return fallback;
        };
        return {
          bulkActions: translate('TagManagerExtended_BulkActions', 'Bulk Actions'),
          selectAll: translate('TagManagerExtended_SelectAll', 'Select All'),
          deselectAll: translate('TagManagerExtended_DeselectAll', 'Deselect All'),
          selected: translate('TagManagerExtended_Selected', '%s selected'),
          bulkDelete: translate('TagManagerExtended_BulkDelete', 'Delete'),
          bulkPause: translate('TagManagerExtended_BulkPause', 'Pause'),
          bulkResume: translate('TagManagerExtended_BulkResume', 'Resume'),
          confirmBulkDelete: translate('TagManagerExtended_ConfirmBulkDelete', 'Are you sure you want to delete %s items?'),
          confirmBulkPause: translate('TagManagerExtended_ConfirmBulkPause', 'Are you sure you want to pause %s tags?'),
          confirmBulkResume: translate('TagManagerExtended_ConfirmBulkResume', 'Are you sure you want to resume %s tags?'),
          bulkSuccess: translate('TagManagerExtended_BulkSuccess', 'Successfully processed %s items.'),
          bulkPartialSuccess: translate('TagManagerExtended_BulkPartialSuccess', 'Processed %s items successfully, %s failed.')
        };
      }
    }, {
      key: "attachToolbarEvents",
      value: function attachToolbarEvents(toolbar, entityType) {
        var _this4 = this;
        var selectAllCheckbox = toolbar.querySelector('.tme-select-all');
        var pauseBtn = toolbar.querySelector('.tme-bulk-pause');
        var resumeBtn = toolbar.querySelector('.tme-bulk-resume');
        var deleteBtn = toolbar.querySelector('.tme-bulk-delete');
        selectAllCheckbox.addEventListener('change', function (e) {
          _this4.toggleSelectAll(e.target.checked, entityType);
        });
        if (pauseBtn) {
          pauseBtn.addEventListener('click', function () {
            return _this4.executeBulkAction('pause', entityType);
          });
        }
        if (resumeBtn) {
          resumeBtn.addEventListener('click', function () {
            return _this4.executeBulkAction('resume', entityType);
          });
        }
        if (deleteBtn) {
          deleteBtn.addEventListener('click', function () {
            return _this4.executeBulkAction('delete', entityType);
          });
        }
      }
    }, {
      key: "injectCheckboxes",
      value: function injectCheckboxes(table, listConfig) {
        var _this5 = this;
        // Inject header checkbox cell
        var headerRow = table.querySelector('thead tr');
        if (headerRow && !headerRow.querySelector('.tme-checkbox-cell')) {
          var th = document.createElement('th');
          th.className = 'tme-checkbox-cell';
          th.innerHTML = '';
          headerRow.insertBefore(th, headerRow.firstChild);
        }

        // Inject row checkboxes
        var rows = table.querySelectorAll("tbody tr.".concat(listConfig.rowClass));
        rows.forEach(function (row) {
          // Skip if checkbox already exists
          if (row.querySelector('.tme-checkbox-cell')) return;

          // Skip loading or empty rows
          if (row.querySelector('.loadingPiwik') || row.querySelector('[colspan]')) return;
          var id = _this5.extractIdFromRow(row, listConfig.idPrefix);
          if (!id) return;
          var td = document.createElement('td');
          td.className = 'tme-checkbox-cell';
          td.innerHTML = "<label class=\"tme-checkbox-label\">\n          <input type=\"checkbox\" class=\"tme-row-checkbox\" data-id=\"".concat(id, "\" data-type=\"").concat(listConfig.type, "\" />\n          <span></span>\n        </label>");
          row.insertBefore(td, row.firstChild);
          var checkbox = td.querySelector('.tme-row-checkbox');
          checkbox.addEventListener('change', function (e) {
            _this5.handleRowSelection(e.target, row, listConfig.type);
          });
        });
      }
    }, {
      key: "extractIdFromRow",
      value: function extractIdFromRow(row, idPrefix) {
        var rowId = row.id;
        if (rowId && rowId.startsWith(idPrefix)) {
          return rowId.replace(idPrefix, '');
        }
        return null;
      }
    }, {
      key: "handleRowSelection",
      value: function handleRowSelection(checkbox, row, entityType) {
        var id = checkbox.dataset.id;
        if (checkbox.checked) {
          this.selectedItems.set(id, {
            id: id,
            type: entityType
          });
          row.classList.add('tme-selected');
        } else {
          this.selectedItems["delete"](id);
          row.classList.remove('tme-selected');
        }
        this.updateToolbarState(entityType);
      }
    }, {
      key: "toggleSelectAll",
      value: function toggleSelectAll(checked, entityType) {
        var _this6 = this;
        var container = this.getContainerForType(entityType);
        if (!container) return;
        var checkboxes = container.querySelectorAll('.tme-row-checkbox');
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = checked;
          var row = checkbox.closest('tr');
          if (checked) {
            _this6.selectedItems.set(checkbox.dataset.id, {
              id: checkbox.dataset.id,
              type: entityType
            });
            row.classList.add('tme-selected');
          } else {
            _this6.selectedItems["delete"](checkbox.dataset.id);
            row.classList.remove('tme-selected');
          }
        });
        this.updateToolbarState(entityType);
      }
    }, {
      key: "updateToolbarState",
      value: function updateToolbarState(entityType) {
        var container = this.getContainerForType(entityType);
        if (!container) return;
        var toolbar = container.querySelector('.tme-bulk-actions');
        if (!toolbar) return;
        var count = this.selectedItems.size;
        var translations = this.getTranslations();

        // Update selection count
        var countDisplay = toolbar.querySelector('.tme-selection-count');
        if (countDisplay) {
          countDisplay.textContent = count > 0 ? translations.selected.replace('%s', count) : '';
        }

        // Update select all checkbox state
        var selectAllCheckbox = toolbar.querySelector('.tme-select-all');
        var allCheckboxes = container.querySelectorAll('.tme-row-checkbox');
        if (selectAllCheckbox && allCheckboxes.length > 0) {
          var allSelected = Array.from(allCheckboxes).every(function (cb) {
            return cb.checked;
          });
          var someSelected = Array.from(allCheckboxes).some(function (cb) {
            return cb.checked;
          });
          selectAllCheckbox.checked = allSelected;
          selectAllCheckbox.indeterminate = someSelected && !allSelected;
        }

        // Enable/disable buttons
        var buttons = toolbar.querySelectorAll('.tme-bulk-btn');
        buttons.forEach(function (btn) {
          btn.disabled = count === 0;
        });
      }
    }, {
      key: "getContainerForType",
      value: function getContainerForType(entityType) {
        var selectors = {
          tag: '.tagManagerTagList',
          trigger: '.tagManagerTriggerList',
          variable: '.tagManagerVariableList'
        };
        return document.querySelector(selectors[entityType]);
      }
    }, {
      key: "executeBulkAction",
      value: function () {
        var _executeBulkAction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(action, entityType) {
          var count, translations, confirmMessage, confirmed, ids, params, result;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                count = this.selectedItems.size;
                if (!(count === 0)) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                translations = this.getTranslations();
                _context.t0 = action;
                _context.next = _context.t0 === 'delete' ? 7 : _context.t0 === 'pause' ? 9 : _context.t0 === 'resume' ? 11 : 13;
                break;
              case 7:
                confirmMessage = translations.confirmBulkDelete.replace('%s', count);
                return _context.abrupt("break", 13);
              case 9:
                confirmMessage = translations.confirmBulkPause.replace('%s', count);
                return _context.abrupt("break", 13);
              case 11:
                confirmMessage = translations.confirmBulkResume.replace('%s', count);
                return _context.abrupt("break", 13);
              case 13:
                confirmed = confirm(confirmMessage);
                if (confirmed) {
                  _context.next = 16;
                  break;
                }
                return _context.abrupt("return");
              case 16:
                ids = Array.from(this.selectedItems.keys());
                params = this.getContainerParams();
                if (params) {
                  _context.next = 21;
                  break;
                }
                alert('Could not determine container parameters');
                return _context.abrupt("return");
              case 21:
                _context.prev = 21;
                _context.next = 24;
                return this.callBulkApi(action, entityType, ids, params);
              case 24:
                result = _context.sent;
                this.handleBulkResult(result, translations);
                this.clearSelection(entityType);
                this.reloadList();
                _context.next = 33;
                break;
              case 30:
                _context.prev = 30;
                _context.t1 = _context["catch"](21);
                alert('Bulk action failed: ' + _context.t1.message);
              case 33:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[21, 30]]);
        }));
        function executeBulkAction(_x, _x2) {
          return _executeBulkAction.apply(this, arguments);
        }
        return executeBulkAction;
      }()
    }, {
      key: "getContainerParams",
      value: function getContainerParams() {
        var idSite = null;
        var idContainer = null;
        var idContainerVersion = null;

        // Method 1: Try to get from Matomo's broadcast
        if (window.broadcast) {
          idSite = window.broadcast.getValueFromUrl('idSite');
          idContainer = window.broadcast.getValueFromUrl('idContainer');
          idContainerVersion = window.broadcast.getValueFromUrl('idContainerVersion');
        }

        // Method 2: Try piwik global
        if (!idSite && window.piwik && window.piwik.idSite) {
          idSite = window.piwik.idSite;
        }

        // Method 3: Parse from hash URL
        if (!idContainer || !idContainerVersion) {
          var hash = window.location.hash;
          var containerMatch = hash.match(/idContainer=([^&]+)/);
          var versionMatch = hash.match(/idContainerVersion=(\d+)/);
          if (containerMatch) idContainer = containerMatch[1];
          if (versionMatch) idContainerVersion = versionMatch[1];
        }

        // Method 4: Try Vue entry attributes
        if (!idContainer || !idContainerVersion) {
          var vueEntry = document.querySelector('[vue-entry*="TagManager"]') || document.querySelector('[vue-entry="TagManager.TagManage"]') || document.querySelector('[vue-entry="TagManager.TriggerManage"]') || document.querySelector('[vue-entry="TagManager.VariableManage"]');
          if (vueEntry) {
            var containerAttr = vueEntry.getAttribute('id-container');
            var versionAttr = vueEntry.getAttribute('id-container-version');
            if (containerAttr && !idContainer) idContainer = containerAttr.replace(/['"&;]+/g, '').replace(/quot/g, '');
            if (versionAttr && !idContainerVersion) idContainerVersion = versionAttr.replace(/['"&;]+/g, '').replace(/quot/g, '');
          }
        }

        // Method 5: Look for idContainerVersion in page elements
        if (!idContainerVersion) {
          var elementsWithVersion = document.querySelectorAll('[id-container-version], [data-id-container-version]');
          var _iterator3 = _createForOfIteratorHelper(elementsWithVersion),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var el = _step3.value;
              var ver = el.getAttribute('id-container-version') || el.getAttribute('data-id-container-version');
              if (ver) {
                idContainerVersion = ver.replace(/['"&;]+/g, '').replace(/quot/g, '');
                break;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }

        // Method 6: Try URL search params
        if (!idSite) {
          var urlParams = new URLSearchParams(window.location.search);
          idSite = urlParams.get('idSite');
        }

        // Method 7: Default idContainerVersion to 1 for draft if still missing
        if (!idContainerVersion && idContainer) {
          idContainerVersion = '1';
        }
        if (idSite && idContainer && idContainerVersion) {
          return {
            idSite: idSite,
            idContainer: idContainer,
            idContainerVersion: idContainerVersion
          };
        }
        return null;
      }
    }, {
      key: "callBulkApi",
      value: function () {
        var _callBulkApi = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(action, entityType, ids, params) {
          var _methodMap$entityType;
          var methodMap, method, idParamName;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                methodMap = {
                  tag: {
                    "delete": 'TagManagerExtended.bulkDeleteTags',
                    pause: 'TagManagerExtended.bulkPauseTags',
                    resume: 'TagManagerExtended.bulkResumeTags'
                  },
                  trigger: {
                    "delete": 'TagManagerExtended.bulkDeleteTriggers'
                  },
                  variable: {
                    "delete": 'TagManagerExtended.bulkDeleteVariables'
                  }
                };
                method = (_methodMap$entityType = methodMap[entityType]) === null || _methodMap$entityType === void 0 ? void 0 : _methodMap$entityType[action];
                if (method) {
                  _context2.next = 4;
                  break;
                }
                throw new Error("Invalid action ".concat(action, " for entity type ").concat(entityType));
              case 4:
                idParamName = entityType === 'tag' ? 'idTags' : entityType === 'trigger' ? 'idTriggers' : 'idVariables'; // Use Matomo's global AJAX helper
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  if (window.globalAjaxQueue && window.ajaxHelper) {
                    var request = new window.ajaxHelper();
                    request.setFormat('json');
                    request.addParams({
                      module: 'API',
                      method: method,
                      idSite: params.idSite,
                      idContainer: params.idContainer,
                      idContainerVersion: params.idContainerVersion,
                      format: 'json'
                    }, 'get');
                    ids.forEach(function (id, index) {
                      request.addParams(_defineProperty({}, "".concat(idParamName, "[").concat(index, "]"), id), 'get');
                    });
                    request.setCallback(function (response) {
                      if (response && response.result === 'error') {
                        reject(new Error(response.message || 'API error'));
                      } else {
                        resolve(response);
                      }
                    });
                    request.setErrorCallback(function (error) {
                      reject(error);
                    });
                    request.send();
                  } else {
                    // Fallback: direct fetch
                    var urlParams = new URLSearchParams({
                      module: 'API',
                      method: method,
                      idSite: params.idSite,
                      idContainer: params.idContainer,
                      idContainerVersion: params.idContainerVersion,
                      format: 'json'
                    });
                    ids.forEach(function (id) {
                      urlParams.append("".concat(idParamName, "[]"), id);
                    });
                    fetch("index.php?".concat(urlParams.toString()), {
                      method: 'GET',
                      credentials: 'same-origin'
                    }).then(function (response) {
                      return response.json();
                    }).then(function (data) {
                      if (data.result === 'error') {
                        reject(new Error(data.message || 'API error'));
                      } else {
                        resolve(data);
                      }
                    })["catch"](reject);
                  }
                }));
              case 6:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        function callBulkApi(_x3, _x4, _x5, _x6) {
          return _callBulkApi.apply(this, arguments);
        }
        return callBulkApi;
      }()
    }, {
      key: "handleBulkResult",
      value: function handleBulkResult(result, translations) {
        if (!result) return;
        var message;
        if (result.failed === 0) {
          message = translations.bulkSuccess.replace('%s', result.success);
        } else {
          message = translations.bulkPartialSuccess.replace('%s', result.success).replace('%s', result.failed);
        }
        alert(message);
      }
    }, {
      key: "clearSelection",
      value: function clearSelection(entityType) {
        this.selectedItems.clear();
        var container = this.getContainerForType(entityType);
        if (container) {
          container.querySelectorAll('.tme-row-checkbox').forEach(function (cb) {
            var _cb$closest;
            cb.checked = false;
            (_cb$closest = cb.closest('tr')) === null || _cb$closest === void 0 || _cb$closest.classList.remove('tme-selected');
          });
          var selectAllCheckbox = container.querySelector('.tme-select-all');
          if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
          }
        }
        this.updateToolbarState(entityType);
      }
    }, {
      key: "reloadList",
      value: function reloadList() {
        window.location.reload();
      }
    }, {
      key: "reinitialize",
      value: function reinitialize(entityType) {
        this.initialized["delete"](entityType);
        var listContainer = document.querySelector('.tagManagerManageList');
        if (listContainer) {
          this.checkAndInitialize(listContainer);
        }
      }
    }]);
  }(); // Initialize bulk actions manager
  var bulkManager = new BulkActionsManager();

  // Initialize when on TagManager page
  var initBulkActions = function initBulkActions() {
    var listContainer = document.querySelector('.tagManagerManageList');
    if (listContainer) {
      bulkManager.init();
    }
  };

  // Run initialization
  initBulkActions();

  // Listen for Vue route changes
  var lastHash = window.location.hash;
  window.addEventListener('hashchange', function () {
    var newHash = window.location.hash;
    if (newHash !== lastHash) {
      var isTagList = newHash.includes('manageTags') || newHash.includes('Tags');
      var isTriggerList = newHash.includes('manageTriggers') || newHash.includes('Triggers');
      var isVariableList = newHash.includes('manageVariables') || newHash.includes('Variables');
      if (isTagList || isTriggerList || isVariableList) {
        setTimeout(function () {
          bulkManager.initialized.clear();
          bulkManager.selectedItems.clear();
          initBulkActions();
        }, 500);
      }
    }
    lastHash = newHash;
  });
});
/******/ })()
;