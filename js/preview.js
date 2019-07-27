'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFile = document.querySelector('#upload-file');
  var effectsPreviews = document.querySelectorAll('.effects__preview');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var comment = imgUploadOverlay.querySelector('.text__description');
  var hashTagInput = imgUploadOverlay.querySelector('.text__hashtags');
  var submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');
  var bodyContainer = document.querySelector('body');
  var onImgUploadEscPress = function (evt) {
    if (comment !== document.activeElement && evt.keyCode === window.utilities.escKeykode && hashTagInput !== document.activeElement) {
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
    comment.value = '';
    submitButton.removeEventListener('click', onSubmitClick);
    form.removeEventListener('submit', onFormSubmit);
  };

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        for (var i = 0; i < effectsPreviews.length; i++) {
          effectsPreviews[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
        imgUploadPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
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
  var isUniqElementsInArray = function (rawArray) {
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
  var setInvalidClass = function (element) {
    element.classList.add('invalid');
  };

  // Снятие класса .invalid
  var unsetInvalidClass = function (element) {
    element.classList.remove('invalid');
  };

  // Клик на кнопке отправки формы
  var onSubmitClick = function () {
    unsetInvalidClass(hashTagInput);
    hashTagInput.setCustomValidity('');
    checkHashTagsValidity();
  };

  // Чистка хэш-тегов от лишних пробелов
  var trimHashTags = function (array) {
    array = array.filter(function (it) {
      return it !== '';
    });
    hashTagInput.value = array.join(HASH_TAGS_VALIDATION.separator);
    return array;
  };

  // Валидация строки с хэш-тегами
  var checkHashTagsValidity = function () {
    var rawArray = hashTagInput.value.split(HASH_TAGS_VALIDATION.separator);
    var arrayOfValues = trimHashTags(rawArray);
    if (!arrayOfValues.length) {
      return;
    }

    arrayOfValues.forEach(function (it) {
      var hashSymbols = it.match(HASH_TAGS_VALIDATION.regExpFirstChar);

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

      var isTagContainOnlyHash = arrayOfValues.some(function (item) {
        return item === '#';
      });

      if (hashSymbols.length !== 1 || isTagContainOnlyHash) {
        setInvalidClass(hashTagInput);
        hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.hashTagEmpty);
        return;
      }
    });

    if (!isUniqElementsInArray(arrayOfValues)) {
      setInvalidClass(hashTagInput);
      hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.doubleTag);
    }

    if (arrayOfValues.length > HASH_TAGS_VALIDATION.maxAmount) {
      setInvalidClass(hashTagInput);
      hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.error.maxCount);
    }
  };


  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorMessage = errorTemplate.cloneNode(true);
  var successMessage = successTemplate.cloneNode(true);

  var mainTag = document.querySelector('main');
  var buttonCloseMessage = successMessage.querySelector('.success__button');
  var buttonRepeat = errorMessage.querySelector('.error__button');

  // Функция сообщение об ошибки
  window.displayErrorMessage = function (message) {
    errorMessage.querySelector('.error__title').textContent = message;
    mainTag.appendChild(errorMessage);
    buttonRepeat.addEventListener('click', function () {
      closePopup();
      errorMessage.remove();
    });
    errorMessage.addEventListener('click', function () {
      errorMessage.remove();
      closePopup();
    });
  };

  // Функция сообщение об успешной загрузки
  var displaySuccessTemplate = function () {
    mainTag.appendChild(successMessage);
    buttonCloseMessage.addEventListener('click', function () {
      successMessage.remove();
    });
    successMessage.addEventListener('click', function () {
      successMessage.remove();
    });
  };

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.sendToServer(new FormData(form), function () {
      closePopup();
      displaySuccessTemplate();
    }, window.displayErrorMessage);
  }

})();

