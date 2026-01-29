(function () {
    return function (parameters, TagManager) {

        var selector = parameters.get('selector') || '';
        var listenType = parameters.get('listenType') || 'change';

        function isFormElement(element) {
            if (!element || !element.tagName) {
                return false;
            }
            var tagName = element.tagName.toLowerCase();
            return tagName === 'input' || tagName === 'select' || tagName === 'textarea';
        }

        function matchesSelector(element) {
            if (!selector) {
                return true; // No selector = match all form elements
            }
            try {
                return element.matches(selector);
            } catch (e) {
                return false;
            }
        }

        function getElementValue(element) {
            var tagName = element.tagName.toLowerCase();
            var type = (element.type || '').toLowerCase();

            // Checkbox
            if (tagName === 'input' && type === 'checkbox') {
                return element.checked;
            }

            // Radio
            if (tagName === 'input' && type === 'radio') {
                return element.checked ? element.value : '';
            }

            // Select multiple
            if (tagName === 'select' && element.multiple) {
                var values = [];
                for (var i = 0; i < element.options.length; i++) {
                    if (element.options[i].selected) {
                        values.push(element.options[i].value);
                    }
                }
                return values;
            }

            return element.value;
        }

        function handleEvent(event, triggerEvent) {
            var element = event.target;

            if (!isFormElement(element)) {
                return;
            }

            if (!matchesSelector(element)) {
                return;
            }

            var tagName = element.tagName.toLowerCase();
            var type = (element.type || '').toLowerCase();

            triggerEvent({
                event: 'mtm.FormInput',
                'mtm.formInputElement': element,
                'mtm.formInputValue': getElementValue(element),
                'mtm.formInputName': element.name || '',
                'mtm.formInputId': element.id || '',
                'mtm.formInputType': type || tagName,
                'mtm.formInputTagName': tagName,
                'mtm.formInputClasses': element.className || '',
                'mtm.formInputChecked': element.checked || false,
                'mtm.formInputSelectedText': tagName === 'select' && element.selectedIndex >= 0
                    ? element.options[element.selectedIndex].text
                    : ''
            });
        }

        this.setUp = function (triggerEvent) {
            var handler = function (event) {
                handleEvent(event, triggerEvent);
            };

            if (listenType === 'change' || listenType === 'both') {
                TagManager.dom.addEventListener(document, 'change', handler, true);
            }

            if (listenType === 'input' || listenType === 'both') {
                TagManager.dom.addEventListener(document, 'input', handler, true);
            }
        };
    };
})();
