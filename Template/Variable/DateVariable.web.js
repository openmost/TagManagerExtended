(function () {
    return function (parameters, TagManager) {

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        function pad(num, size) {
            var s = '0' + num;
            return s.substr(s.length - size);
        }

        function formatDate(format, date) {
            var result = '';

            for (var i = 0; i < format.length; i++) {
                var char = format[i];

                // Handle escape character
                if (char === '\\' && i + 1 < format.length) {
                    result += format[i + 1];
                    i++;
                    continue;
                }

                switch (char) {
                    // Year
                    case 'Y': result += date.getFullYear(); break;
                    case 'y': result += String(date.getFullYear()).substr(-2); break;

                    // Month
                    case 'm': result += pad(date.getMonth() + 1, 2); break;
                    case 'n': result += date.getMonth() + 1; break;
                    case 'M': result += monthNamesShort[date.getMonth()]; break;
                    case 'F': result += monthNames[date.getMonth()]; break;
                    case 't': result += new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); break;

                    // Day
                    case 'd': result += pad(date.getDate(), 2); break;
                    case 'j': result += date.getDate(); break;
                    case 'D': result += dayNamesShort[date.getDay()]; break;
                    case 'l': result += dayNames[date.getDay()]; break;
                    case 'N': result += date.getDay() || 7; break;
                    case 'w': result += date.getDay(); break;

                    // Hour
                    case 'H': result += pad(date.getHours(), 2); break;
                    case 'G': result += date.getHours(); break;
                    case 'h': result += pad(date.getHours() % 12 || 12, 2); break;
                    case 'g': result += date.getHours() % 12 || 12; break;

                    // Minute
                    case 'i': result += pad(date.getMinutes(), 2); break;

                    // Second
                    case 's': result += pad(date.getSeconds(), 2); break;

                    // AM/PM
                    case 'a': result += date.getHours() < 12 ? 'am' : 'pm'; break;
                    case 'A': result += date.getHours() < 12 ? 'AM' : 'PM'; break;

                    // Timestamp
                    case 'U': result += Math.floor(date.getTime() / 1000); break;

                    // Week number
                    case 'W':
                        var target = new Date(date.valueOf());
                        var dayNr = (date.getDay() + 6) % 7;
                        target.setDate(target.getDate() - dayNr + 3);
                        var firstThursday = target.valueOf();
                        target.setMonth(0, 1);
                        if (target.getDay() !== 4) {
                            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
                        }
                        result += pad(1 + Math.ceil((firstThursday - target) / 604800000), 2);
                        break;

                    // Day of year
                    case 'z':
                        var start = new Date(date.getFullYear(), 0, 0);
                        var diff = date - start;
                        var oneDay = 1000 * 60 * 60 * 24;
                        result += Math.floor(diff / oneDay) - 1;
                        break;

                    // Default: keep character as is
                    default: result += char;
                }
            }

            return result;
        }

        this.get = function () {
            var format = parameters.get('format');

            if (!format) {
                return;
            }

            try {
                return formatDate(format, new Date());
            } catch (e) {
                return;
            }
        };
    };
})();
