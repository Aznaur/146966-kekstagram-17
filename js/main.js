'use strict';
var ESC_KEYCODE = 27;

function randomInteger(min, max) {
  var rand = Math.floor(min + Math.random() * (max - min + 1));
  rand = Math.round(rand);
  return rand;
}

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var authorNames = ['Артем', 'Алексей', 'Василий', 'Аня', 'Настя', 'Коля'];

var comments = [];
var getCommentsPhotos = function () {
  for (var i = 0; i < 6; i++) {
    comments.push({
      avatar: 'mig/avatar-' + (i + 1) + '.svg',
      message: messages[i],
      name: authorNames[i]
    });
  }
  return comments;
};
comments = getCommentsPhotos();

var publishedPhotos = [];
var getArrayPhotos = function () {
  for (var j = 0; j < 25; j++) {
    publishedPhotos.push({
      url: 'photos/' + (j + 1) + '.jpg',
      likes: randomInteger(15, 200),
      comment: comments[randomInteger(0, comments.length - 1)]
    });
  }
  return publishedPhotos;
};
publishedPhotos = getArrayPhotos();


var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


var renderWizard = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.href = photo.url;
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = randomInteger(1, 10);
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  return photoElement;
};


var appendPhotoElement = function () {
  var fragment = document.createDocumentFragment();
  for (var p = 0; p < publishedPhotos.length; p++) {
    fragment.appendChild(renderWizard(publishedPhotos[p]));
  }
  return fragment;
};

picturesElement.appendChild(appendPhotoElement());

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var comm = document.querySelector('.text__description');

var onImgUploadEscPress = function (evt) {
  if (comm === document.activeElement) {
    return evt;
  } else if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadEscPress);
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onImgUploadEscPress);
  uploadFile.value = '';
};

uploadFile.addEventListener('change', function () {
  openPopup();
});

imgUploadCancel.addEventListener('click', function () {
  closePopup();
});

var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var effectControl = document.querySelector('.effect-level__pin');
var effectControlBar = document.querySelector('.effect-level__depth');
var result;
var VALUE_CONST = 20;
var effectValue = document.querySelector('.effect-level__value');
var controlPin = document.querySelector('.img-upload__effect-level');
controlPin.style.display = 'none';
for (var i = 0; i < effectsRadio.length; i++) {
  clickControl(effectsRadio[i]);
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

function clickControl(control) {
  control.addEventListener('click', function () {
    effectControl.style.left = VALUE_CONST / 100 * 453 + 'px';
    effectControlBar.style.width = VALUE_CONST / 100 * 453 + 'px';
    effectValue.setAttribute('value', VALUE_CONST);
    var getAttributeEffectValue = +effectValue.getAttribute('value');
    toggleFilter(control);
    controlPin.style.display = imgPreview.classList.contains('effects__preview--none') ? 'none' : 'block';
    if (imgPreview.classList.contains('effects__preview--chrome')) {
      imgPreview.style.filter = 'grayscale(' + getFilterValue(getAttributeEffectValue, 100) + ')';
    } else if (imgPreview.classList.contains('effects__preview--sepia')) {
      imgPreview.style.filter = 'sepia(' + getFilterValue(getAttributeEffectValue, 100) + ')';
    } else if (imgPreview.classList.contains('effects__preview--marvin')) {
      imgPreview.style.filter = 'invert(' + getFilterValue(getAttributeEffectValue) + '%' + ')';
    } else if (imgPreview.classList.contains('effects__preview--phobos')) {
      imgPreview.style.filter = 'blur(' + getFilterValue(getAttributeEffectValue, 100) * 3 + 'px' + ')';
    } else if (imgPreview.classList.contains('effects__preview--heat')) {
      imgPreview.style.filter = 'brightness(' + getFilterValue(getAttributeEffectValue, 100) * 2 + ')';
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
    var widthRandge = 453;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };
    result = effectControl.offsetLeft - shift.x;
    if (result >= 0 && result <= widthRandge) {
      effectControl.style.left = (effectControl.offsetLeft - shift.x) + 'px';
      effectControlBar.style.width = effectControl.style.left;
      effectValue.setAttribute('value', Math.round(parseInt(effectControl.style.left) * 100 / widthRandge));
      if (imgPreview.classList.contains('effects__preview--chrome')) {
        imgPreview.style.filter = 'grayscale(' + getFilterValue(result, widthRandge).toFixed(1) + ')';
      } else if (imgPreview.classList.contains('effects__preview--sepia')) {
        imgPreview.style.filter = 'sepia(' + getFilterValue(result, widthRandge).toFixed(1) + ')';
      } else if (imgPreview.classList.contains('effects__preview--marvin')) {
        imgPreview.style.filter = 'invert(' + (getFilterValue(result, widthRandge) * 100).toFixed(0) + '%' + ')';
      } else if (imgPreview.classList.contains('effects__preview--phobos')) {
        imgPreview.style.filter = 'blur(' + getFilterValue(result, widthRandge).toFixed(2) * 3 + 'px' + ')';
      } else if (imgPreview.classList.contains('effects__preview--heat')) {
        imgPreview.style.filter = 'brightness(' + getFilterValue(result, widthRandge).toFixed(2) * 3 + ')';
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
