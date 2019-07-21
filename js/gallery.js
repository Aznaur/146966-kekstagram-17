'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  window.createPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.href = photo.url;
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  };

  window.renderPics = function (data) {
    var fragment = document.createDocumentFragment();
    for (var p = 0; p < data.length; p++) {
      fragment.appendChild(window.createPhotoElement(data[p]));
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
  var pictureElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bodyContainer = document.querySelector('body');


  pictureElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img img').src = window.photosy[0].url;
    bigPicture.querySelector('.likes-count').textContent = window.photosy[0].likes;
    bigPicture.querySelector('.comments-count').textContent = window.photosy[0].comments.length;
    bigPicture.querySelector('.social__picture').src = 'img/avatar-' + window.randomInteger(1, 6) +'.svg';
    bigPicture.querySelector('.social__caption').textContent = window.photosy[0].description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  });

})();

