'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var ESC_KEYCODE = 27;
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  window.createPhotoElement = function (photo, index) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.href = photo.url;
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__img').dataset.index = index;
    photoElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      showBigPicture(photo);
    });
    return photoElement;
  };

  window.renderPics = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.createPhotoElement(data[i], i));
    }
    picturesElement.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var successHandler = function (data) {
    window.photosy = data.slice(0);
    window.renderPics(window.photosy);
  };

  window.load(successHandler);

  // Модуль показа большой фотографии
  // --------------------------------
  var bigPicture = document.querySelector('.big-picture');
  var bodyContainer = document.querySelector('body');
  var clouseBigPicture = bigPicture.querySelector('.big-picture__cancel');

  var showBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.addEventListener('keydown', onPicturClousedEscPress);
    var commentTemplate = bigPicture.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = photo.comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = photo.comments[i].name;
      commentElement.querySelector('.social__text').textContent = photo.comments[i].message;
      fragment.appendChild(commentElement);
    }
    bigPicture.querySelector('.social__comments').innerHTML = '';
    bigPicture.querySelector('.social__comments').appendChild(fragment);
  };

// Модуль закрытия большой фотографии
// ----------------------------------
  var onPicturClousedEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      clousePopupBigPicture();
    }
  };

  var clousePopupBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPicturClousedEscPress);
    bodyContainer.classList.remove('modal-open');
  };

  clouseBigPicture.addEventListener('click', function () {
    clousePopupBigPicture();
  });


})();

