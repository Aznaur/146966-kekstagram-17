'use strict';
(function () {

  var popular = document.querySelector('#filter-popular');
  var random = document.querySelector('#filter-new');
  var discusssed = document.querySelector('#filter-discussed');
  var photoBox = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var filterEl = filters.querySelectorAll('.img-filters__button');

  var removePhoto = function () {
    var photo = photoBox.querySelectorAll('.picture');
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
  function sortingPopular(a, b) {
    return b - a;
  }

  // Сортировка по кол-ву комментариев
  function sortingDiscussed(a, b) {
    return b.comments.length - a.comments.length;
  }

  // Сортировка в случайном порядке
  function sortingRandom() {
    return Math.random() - 0.5;
  }

  var newFunc = function (sortingFunc, sortingClass) {
    removePhoto();
    removeActiveFilter();
    var newPics = window.photosy.slice().sort(sortingFunc);
    window.debounce.setDebounce(window.renderPics(newPics));
    sortingClass.classList.add('img-filters__button--active');
  };

  var popularChangeHandler = function () {
    newFunc(sortingPopular, popular);
  };

  var discussedChangeHandler = function () {
    newFunc(sortingDiscussed, discusssed);
  };

  var randomChangeHandler = function () {
    newFunc(sortingRandom, random);
  };

  popular.addEventListener('click', popularChangeHandler);
  discusssed.addEventListener('click', discussedChangeHandler);
  random.addEventListener('click', randomChangeHandler);

})();

