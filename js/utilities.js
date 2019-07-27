'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var setDebounce = function (cb) {
    var DEBOUNCE_INTERVAL = 500;
    var lastTimeOut = 0;

    if (lastTimeOut) {
      clearTimeout(lastTimeOut);
    }
    lastTimeOut = setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.utilities = {
    setDebounce: setDebounce,
    escKeykode: ESC_KEYCODE
  };
})();

