'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');


  var displayPhoto = function (photo) {
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
      fragment.appendChild(displayPhoto(publishedPhotos[p]));
    }
    return fragment;
  };

  picturesElement.appendChild(appendPhotoElement());
})();

