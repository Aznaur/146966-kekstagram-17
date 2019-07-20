'use strict';
(function () {

  var popular = document.querySelector('#filter-popular');
  var random = document.querySelector('#filter-new');
  var discusssed = document.querySelector('#filter-discussed');
  var photoBox = document.querySelector('.pictures');
  var photo = photoBox.querySelectorAll('.picture');
  var filters = document.querySelector('.img-filters');
  var filterEl = filters.querySelectorAll('.img-filters__button');


  var removePhoto = function () {
    photo.forEach(function (item) {
      photoBox.removeChild(item);
    });
  };

  var removeActiveFilter = function () {
    filterEl.forEach(function (el) {
      if (el.classList.contains('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });
  };

  // Сортировка по популярности
  function sortingPopular() {
    var popularPhotos = window.photosy.slice();
    popularPhotos.sort(function (a, b) {
      return b - a;
    });
    return popularPhotos;
  }

  // Сортировка по кол-ву комментариев
  function sortingDiscussed() {
    var discussedPhotos = window.photosy.slice();
    discussedPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPhotos;
  }

  // Сортировка в случайном порядке
  function sortingRandom() {
    var randomPhotos = window.photosy.slice();
    randomPhotos.sort(function () {
      return Math.random() - 0.5;
    });
    return randomPhotos;
  }

  var popularChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    window.debounce.setDebounce(window.renderPics(sortingPopular()));
    evt.target.classList.add('img-filters__button--active');
  };

  var discussedChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    window.debounce.setDebounce(window.renderPics(sortingDiscussed()));
    evt.target.classList.add('img-filters__button--active');
  };

  var randomChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    window.debounce.setDebounce(window.renderPics(sortingRandom()));
    evt.target.classList.add('img-filters__button--active');
  };

  popular.addEventListener('click', popularChangeHandler);
  discusssed.addEventListener('click', discussedChangeHandler);
  random.addEventListener('click', randomChangeHandler);

})();

