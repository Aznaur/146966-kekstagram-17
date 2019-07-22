'use strict';
(function () {
  window.randomInteger = function (min, max) {
    var rand = Math.floor(min + Math.random() * (max - min + 1));
    rand = Math.round(rand);
    return rand;
  };
})();

