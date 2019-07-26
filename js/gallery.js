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
    window.photos = data.slice(0);
    window.renderPics(window.photos);
  };

  window.load(successHandler);

  // Модуль показа большой фотографии
  // --------------------------------
  var bigPicture = document.querySelector('.big-picture');
  var bodyContainer = document.querySelector('body');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var shownCommentsCount = bigPicture.querySelector('.shown-comments-count');


  var showBigPicture = function (photo) {

    bigPicture.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    document.addEventListener('keydown', onPicturClosedEscPress);

    var commentTemplate = bigPicture.querySelector('.social__comment');
    bigPicture.querySelector('.social__comments').innerHTML = '';

    var from = 0;
    var to = Math.min(from + 5, photo.comments.length);
    renderComments(photo.comments, from, to, commentTemplate);

    socialCommentsLoader.addEventListener('click', function () {
      var from = to;
      to = Math.min(from + 5, photo.comments.length);
      renderComments(photo.comments, from, to, commentTemplate);
    });

  };

  var renderComments = function (comments, from, to, commentTemplate) {

    shownCommentsCount.textContent = to;
    var fragment = document.createDocumentFragment();

    for (var i = from; i < to; i++) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = comments[i].name;
      commentElement.querySelector('.social__text').textContent = comments[i].message;
      fragment.appendChild(commentElement);
    }

    bigPicture.querySelector('.social__comments').appendChild(fragment);

    if (comments.length > to) {
      socialCommentsLoader.classList.remove('hidden');
    } else {
      socialCommentsLoader.classList.add('hidden');
    }
  };


  // Модуль закрытия большой фотографии
  // ----------------------------------
  var onPicturClosedEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopupBigPicture();
    }
  };

  var closePopupBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPicturClosedEscPress);
    bodyContainer.classList.remove('modal-open');
  };

  closeBigPicture.addEventListener('click', function () {
    closePopupBigPicture();
  });


})();

