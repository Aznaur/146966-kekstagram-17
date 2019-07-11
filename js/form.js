'use strict';
(function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
  var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectControl = document.querySelector('.effect-level__pin');
  var effectControlBar = document.querySelector('.effect-level__depth');
  var result;
  var VALUE_CONST = 20;
  var WIDTH_RANDGE = 453;
  var effectValue = document.querySelector('.effect-level__value');
  var controlPin = document.querySelector('.img-upload__effect-level');
  controlPin.style.display = 'none';
  for (var k = 0; k < effectsRadio.length; k++) {
    clickControl(effectsRadio[k]);
  }

  function toggleFilter(control) {
    for (var j = 0; j < effectsRadio.length; j++) {
      imgPreview.style.filter = '';
      imgPreview.classList.remove(effectsRadio[j].dataset.filter);
    }

    if (imgPreview) {
      imgPreview.classList.add(control.dataset.filter);
    }
  }

  var getFilterValue = function (constValue, percent) {
    if (percent) {
      constValue /= percent;
      return constValue;
    }
    return constValue;
  };

  var filters = [
    {
      class: 'effects__preview--chrome',
      property: 'grayscale',
      filter: function (vali) {
        return this.property + '(' + getFilterValue(vali, 100) + ')';
      },
      units: ''
    },
    {
      class: 'effects__preview--sepia',
      property: 'sepia',
      filter: function (vali) {
        return this.property + '(' + getFilterValue(vali, 100) + ')';
      },
      units: ''
    },
    {
      class: 'effects__preview--marvin',
      property: 'invert',
      filter: function (vali) {
        return this.property + '(' + getFilterValue(vali) + this.units + ')';
      },
      units: '%'
    },
    {
      class: 'effects__preview--phobos',
      property: 'blur',
      filter: function (vali) {
        return this.property + '(' + getFilterValue(vali, 100) * this.maxValue + this.units + ')';
      },
      maxValue: 3,
      units: 'px'
    },
    {
      class: 'effects__preview--heat',
      property: 'brightness',
      filter: function (vali) {
        return this.property + '(' + getFilterValue(vali, 100) * this.maxValue + ')';
      },
      maxValue: 3,
      units: ''
    }
  ];

  function clickControl(control) {
    control.addEventListener('click', function () {
      effectControl.style.left = VALUE_CONST / 100 * WIDTH_RANDGE + 'px';
      effectControlBar.style.width = VALUE_CONST / 100 * WIDTH_RANDGE + 'px';
      effectValue.setAttribute('value', VALUE_CONST);
      var getAttributeEffectValue = +effectValue.value;
      toggleFilter(control);
      controlPin.style.display = imgPreview.classList.contains('effects__preview--none') ? 'none' : 'block';
      for (var j = 0; j < filters.length; j++) {
        if (imgPreview.classList.contains(filters[j].class)) {
          imgPreview.style.filter = filters[j].filter(getAttributeEffectValue, filters[j]);
        }
      }
    });
  }

  var controlMin = document.querySelector('.scale__control--smaller');
  var controlMax = document.querySelector('.scale__control--bigger');
  var controlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var STEP = 25;

  var scaleOut = function () {
    var presentValue = parseInt(controlValue.getAttribute('value'), 10);
    if (presentValue > 25) {
      presentValue = presentValue - STEP;
      controlValue.setAttribute('value', presentValue + '%');
      imgUploadPreview.style.transform = 'scale(' + (presentValue / 100) + ')';
    }
  };

  var scaleUp = function () {
    var presentValue = parseInt(controlValue.getAttribute('value'), 10);
    if (presentValue < 100) {
      presentValue = presentValue + STEP;
      controlValue.setAttribute('value', presentValue + '%');
      imgUploadPreview.style.transform = 'scale(' + (presentValue / 100) + ')';
    }
  };

  controlMin.addEventListener('click', function () {
    scaleOut();
  });

  controlMax.addEventListener('click', function () {
    scaleUp();
  });

  effectControl.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };
      result = effectControl.offsetLeft - shift.x;
      if (result >= 0 && result <= WIDTH_RANDGE) {
        effectControl.style.left = (effectControl.offsetLeft - shift.x) + 'px';
        effectControlBar.style.width = effectControl.style.left;
        effectValue.value = Math.round(parseInt(effectControl.style.left, 10) * 100 / WIDTH_RANDGE);
        for (var i = 0; i < filters.length; i++) {
          if (imgPreview.classList.contains(filters[i].class)) {
            imgPreview.style.filter = filters[i].filter((result / WIDTH_RANDGE * 100).toFixed(0), filters[i]);
          }
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
