'use strict';
(function () {

  var popular = document.querySelector('#filter-popular');
  var random = document.querySelector('#filter-new');
  var discusssed = document.querySelector('#filter-discussed');

  var removePhoto = function () {
    var photoBox = document.querySelector('.pictures');
    var photo = photoBox.querySelectorAll('.picture');
    photo.forEach(function (item) {
      photoBox.removeChild(item);
    });
  };

  var removeActiveFilter = function () {
    var filters = document.querySelector('.img-filters');
    var filterEl = filters.querySelectorAll('.img-filters__button');
    filterEl.forEach(function (el) {
      if (el.classList.contains('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });
  };

  // Сортировка по популярности
  function sortingPopular() {
    var popularPhotos = window.photosy.slice(0);
    popularPhotos.sort(function (a, b) {
      return b - a;
    });
    return popularPhotos;
  }

  // Сортировка по кол-ву комментариев
  function sortingDiscussed() {
    var discussedPhotos = window.photosy.slice(0);
    discussedPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPhotos;
  }

  // Сортировка в случайном порядке
  function sortingRandom() {
    var randomPhotos = window.photosy.slice(0);
    randomPhotos.sort(function (a, b) {
      return Math.random() - 0.5;
    });
    return randomPhotos;
  }


  var popularChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    window.renderPics(sortingPopular());
    evt.target.classList.add('img-filters__button--active');
  };

  var discussedChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    window.renderPics(sortingDiscussed());
    evt.target.classList.add('img-filters__button--active');
  };

  var randomChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    window.renderPics(sortingRandom());
    evt.target.classList.add('img-filters__button--active');
  };

  popular.addEventListener('click', popularChangeHandler);
  discusssed.addEventListener('click', discussedChangeHandler);
  random.addEventListener('click', randomChangeHandler);

})();