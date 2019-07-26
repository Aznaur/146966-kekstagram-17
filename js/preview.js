'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var comm = imgUploadOverlay.querySelector('.text__description');
  var hashTagInput = imgUploadOverlay.querySelector('.text__hashtags');
  var submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');
  var bodyContainer = document.querySelector('body');
  var onImgUploadEscPress = function (evt) {
    if (comm !== document.activeElement && evt.keyCode === ESC_KEYCODE && hashTagInput !== document.activeElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
    submitButton.addEventListener('click', onSubmitClick);
    form.addEventListener('submit', onFormSubmit);
    bodyContainer.classList.add('modal-open');
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onImgUploadEscPress);
    bodyContainer.classList.remove('modal-open');
    uploadFile.value = '';
    hashTagInput.value = '';
    comm.value = '';
    submitButton.removeEventListener('click', onSubmitClick);
    form.removeEventListener('submit', onFormSubmit);
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
    error: {
      doubleTag: 'Один и тот же хэш-тег не может быть использован дважды',
      maxCount: 'Нельзя указать больше пяти хэш-тегов',
      startHashTag: 'Хэш-тег начинается с символа # (решётка)',
      hashTagEmpty: 'Хеш-тег не может состоять только из одной решётки',
      maxOneTag: 'Максимальная длина одного хэш-тега 20 символов.'
    }
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
    window.arrayOfValues = trimHashTags(rawArray);
    if (window.arrayOfValues.length === 0) {
      return;
    }

    window.arrayOfValues.forEach(function (it) {
      window.hashSymbols = it.match(HASH_TAGS_VALIDATION.regExpFirstChar);

      if (it.length >= HASH_TAGS_VALIDATION.maxOneTagLength) {
        setInvalidClass(hashTagInput);
        hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.maxOneTag);
        return;
      }

      if (it.charAt(0) !== HASH_TAGS_VALIDATION.firstChar) {
        setInvalidClass(hashTagInput);
        hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.startHashTag);
        return;
      }

      var isTagContainOnlyHash = window.arrayOfValues.some(function (item) {
        return item === '#';
      });

      if (window.hashSymbols.length !== 1 || isTagContainOnlyHash) {
        setInvalidClass(hashTagInput);
        hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.hashTagEmpty);
        return;
      }
    });

    if (!isUniqElementsInArray(window.arrayOfValues)) {
      setInvalidClass(hashTagInput);
      hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.doubleTag);
    }

    if (window.arrayOfValues.length > HASH_TAGS_VALIDATION.maxAmount) {
      setInvalidClass(hashTagInput);
      hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.maxCount);
    }
  }


  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  window.errorMessage = errorTemplate.cloneNode(true);
  window.successMessage = successTemplate.cloneNode(true);

  var mainTeg = document.querySelector('main');
  var buttonCloseMessage = window.successMessage.querySelector('.success__button');
  var buttonRepeat = window.errorMessage.querySelector('.error__button');

  // Функция сообщение об ошибки
  var displayErrorMessage = function (message) {
    window.errorMessage.querySelector('.error__title').textContent = message;
    mainTeg.appendChild(window.errorMessage);
    buttonRepeat.addEventListener('click', function () {
      closePopup();
      window.errorMessage.remove();
    });
    window.errorMessage.addEventListener('click', function () {
      window.errorMessage.remove();
      closePopup();
    });
  };

  // Функция сообщение об успешной загрузки
  var displaySuccessTemplate = function () {
    mainTeg.appendChild(window.successMessage);
    buttonCloseMessage.addEventListener('click', function () {
      window.successMessage.remove();
    });
    window.successMessage.addEventListener('click', function () {
      window.successMessage.remove();
    });
  };

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.save(new FormData(form), function () {
      closePopup();
      displaySuccessTemplate();
    }, displayErrorMessage);
  }

})();

