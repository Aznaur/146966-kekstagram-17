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
    photoElement.querySelector('.picture__comments').textContent = window.randomInteger(1, 10);
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

})();

