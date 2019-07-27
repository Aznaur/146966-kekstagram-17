'use strict';
(function () {

  var popular = document.querySelector('#filter-popular');
  var random = document.querySelector('#filter-new');
  var discussed = document.querySelector('#filter-discussed');
  var photoBox = document.querySelector('.pictures');
  var filter = document.querySelector('.img-filters');
  var filters = filter.querySelectorAll('.img-filters__button');

  var removePhoto = function () {
    var photos = photoBox.querySelectorAll('.picture');
    photos.forEach(function (item) {
      photoBox.removeChild(item);
    });
  };

  var removeActiveFilter = function () {
    filters.forEach(function (el) {
      if (el.classList.contains('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });
  };

  // Сортировка по популярности
  var sortingPopular = function (a, b) {
    return b - a;
  };

  // Сортировка по кол-ву комментариев
  var sortingDiscussed = function (a, b) {
    return b.comments.length - a.comments.length;
  };

  // Сортировка в случайном порядке
  var sortingRandom = function () {
    return Math.random() - 0.5;
  };

  var sortPhotos = function (sortingFunc, sortingClass, endSortPhotos) {
    removePhoto();
    removeActiveFilter();
    var newPics = window.photos.slice().sort(sortingFunc);
    if (endSortPhotos) {
      newPics = window.photos.sort(sortingFunc).slice(0, endSortPhotos);
    }
    window.utilities.setDebounce(window.renderPics(newPics));
    sortingClass.classList.add('img-filters__button--active');
  };

  var popularChangeHandler = function () {
    sortPhotos(sortingPopular, popular);
  };

  var discussedChangeHandler = function () {
    sortPhotos(sortingDiscussed, discussed);
  };

  var randomChangeHandler = function () {
    sortPhotos(sortingRandom, random, 10);
  };

  popular.addEventListener('click', popularChangeHandler);
  discussed.addEventListener('click', discussedChangeHandler);
  random.addEventListener('click', randomChangeHandler);

})();

