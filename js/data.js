'use strict';
(function () {
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
    return evt;
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
})();

