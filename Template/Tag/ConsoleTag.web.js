(function () {
    return function (parameters, TagManager) {
        this.fire = function () {

          const consoleType = parameters.get('consoleType');
          const content = parameters.get('content');

          console[consoleType](content);

        };
    };
})();
