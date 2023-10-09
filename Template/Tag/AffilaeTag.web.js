(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var programId = parameters.get('programId');


            var _ae = {
            /* PROGRAM_ID must be changed */
            'pid': programId
          };

            (function () {
            var element = document.createElement('script'); element.type = 'text/javascript'; element.async = true;
            element.src = '//static.affilae.com/ae-v3.5.js';
            var scr = document.getElementsByTagName('script')[0]; scr.parentNode.insertBefore(element, scr);
          })();

        };
    };
})();
