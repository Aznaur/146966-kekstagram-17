'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var comm = document.querySelector('.text__description');
  var hashTagInput = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');
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
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onImgUploadEscPress);
    uploadFile.value = '';
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
    errorMessage1: 'Один и тот же хэш-тег не может быть использован дважды',
    errorMessage2: 'Нельзя указать больше пяти хэш-тегов',
    errorMessage3: 'Хэш-тег начинается с символа # (решётка)',
    errorMessage4: 'Хеш-тег не может состоять только из одной решётки',
    errorMessage5: 'Максимальная длина одного хэш-тега 20 символов.'
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
    window.arrayOfValues = trimHashTags(rawArray);
    if (window.arrayOfValues.length === 0) {
      return;
    }

    window.arrayOfValues.forEach(function (it) {
      window.hashSymbols = it.match(HASH_TAGS_VALIDATION.regExpFirstChar);

      if (it.length >= HASH_TAGS_VALIDATION.maxOneTagLength) {
        setInvalidClass(hashTagInput);
        hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.errorMessage5);
        return;
      }

      if (it.charAt(0) !== HASH_TAGS_VALIDATION.firstChar) {
        setInvalidClass(hashTagInput);
        hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.errorMessage3);
        return;
      }

      var isTagContainOnlyHash = window.arrayOfValues.some(function (item) {
        return item === '#';
      });

      if (window.hashSymbols.length !== 1 || isTagContainOnlyHash) {
        setInvalidClass(hashTagInput);
        hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.errorMessage4);
        return;
      }
    });

    if (!isUniqElementsInArray(window.arrayOfValues)) {
      setInvalidClass(hashTagInput);
      hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.errorMessage1);
    }

    if (window.arrayOfValues.length > HASH_TAGS_VALIDATION.maxAmount) {
      setInvalidClass(hashTagInput);
      hashTagInput.setCustomValidity(HASH_TAGS_VALIDATION.errorMessage2);
    }
  }


  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  window.errorMassage = errorTemplate.cloneNode(true);
  window.successMassage = successTemplate.cloneNode(true);

  var mainTeg = document.querySelector('main');
  var buttonClouseMassage = window.successMassage.querySelector('.success__button');
  var buttonRepeat = window.errorMassage.querySelector('.error__button');
  var fragment = document.createDocumentFragment();

  // Функция сообщение об ошибки
  var displayErrorMessage = function (massage) {
    window.errorMassage.querySelector('.error__title').textContent = massage;
    fragment.appendChild(window.errorMassage);
    mainTeg.appendChild(fragment);
    buttonRepeat.addEventListener('click', function () {
      closePopup();
      window.errorMassage.remove();
    });
    window.errorMassage.addEventListener('click', function () {
      window.errorMassage.remove();
      closePopup();
    });
  };

  // Функция сообщение об успешной загрузки
  var displaySuccessTemplate = function () {
    fragment.appendChild(window.successMassage);
    mainTeg.appendChild(fragment);
    buttonClouseMassage.addEventListener('click', function () {
      window.successMassage.remove();
    });
    window.successMassage.addEventListener('click', function () {
      window.successMassage.remove();
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

