(function () {
    return function (parameters, TagManager) {
        this.fire = function () {

          const content = parameters.get('content');

          alert(content);

        };
    };
})();
