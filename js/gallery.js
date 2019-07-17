'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');


  var createPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.href = photo.url;
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = window.randomInteger(1, 10);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  };

  window.load(function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var p = 0; p < wizards.length; p++) {
      fragment.appendChild(createPhotoElement(wizards[p]));
    }
    picturesElement.appendChild(fragment);
  });
})();

