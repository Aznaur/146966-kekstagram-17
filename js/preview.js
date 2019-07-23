'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var comm = document.querySelector('.text__description');
  var hashTagInput = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('.img-upload__submit');
  var onImgUploadEscPress = function (evt) {
    if (comm !== document.activeElement && evt.keyCode === ESC_KEYCODE && hashTagInput !== document.activeElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
    submitButton.addEventListener('click', onSubmitClick);
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onImgUploadEscPress);
    uploadFile.value = '';
    submitButton.removeEventListener('click', onSubmitClick);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  imgUploadCancel.addEventListener('click', function () {
    closePopup();
  });

  // Валидация формы --------------------------------------------------------
  // ------------------------------------------------------------------------
  var HASH_TAGS_VALIDATION = {
    firstChar: '#',
    regExpFirstChar: /#/g,
    separator: ' ',
    maxAmount: 5,
    maxOneTagLength: 20,
    errorMessage: 'Хэш-тег начинается с символа \`#\` (решётка) и не может состоять только из одной решётки. \nХэш-теги разделяются пробелами. \nОдин и тот же хэш-тег не может быть использован дважды. \nНельзя указать больше пяти хэш-тегов. \nМаксимальная длина одного хэш-тега 20 символов.'
  };

  // Проверка, что все элементы в массиве уникальны
  function isUniqElementsInArray(rawArray) {
    var isUniq = true;
    var array = rawArray.map(function (elem) {
      return elem.toLowerCase();
    });
    for (var i = 0; i < array.length; i++) {
      if (array.indexOf(array[i], i + 1) !== -1) {
        isUniq = false;
        break;
      }
    }
    return isUniq;
  }

  // Назначение класса .invalid
  function setInvalidClass(element) {
    element.classList.add('invalid');
  }

  // Снятие класса .invalid
  function unsetInvalidClass(element) {
    element.classList.remove('invalid');
  }

  // Проверка, присутствует ли класс .invalid у элемента
  function checkInvalidClass(element) {
    return element.classList.contains('invalid');
  }

  // Клик на кнопке отправки формы
  function onSubmitClick() {
    unsetInvalidClass(hashTagInput);
    hashTagInput.setCustomValidity('');
    checkHashTagsValidity();
  }

  // Чистка хэш-тегов от лишних пробелов
  function trimHashTags(array) {
    array = array.filter(function (it) {
      return it !== '';
    });
    hashTagInput.value = array.join(HASH_TAGS_VALIDATION.separator);
    return array;
  }

  // Валидация строки с хэш-тегами
  function checkHashTagsValidity() {
    var rawArray = hashTagInput.value.split(HASH_TAGS_VALIDATION.separator);
    var arrayOfValues = trimHashTags(rawArray);
    if (arrayOfValues.length === 0) {
      return;
    }

    arrayOfValues.forEach(function (it) {
      var hashSymbols = it.match(HASH_TAGS_VALIDATION.regExpFirstChar);

      var isValid = it.charAt(0) === HASH_TAGS_VALIDATION.firstChar && (hashSymbols && hashSymbols.length === 1) && it.length <= HASH_TAGS_VALIDATION.maxOneTagLength;

      if (!isValid) {
        setInvalidClass(hashTagInput);
      }
    });
    if (!isUniqElementsInArray(arrayOfValues) || arrayOfValues.length > HASH_TAGS_VALIDATION.maxAmount) {
      setInvalidClass(hashTagInput);
    }
    if (checkInvalidClass(hashTagInput)) {
      hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.errorMessage);
    }
  }
})();

