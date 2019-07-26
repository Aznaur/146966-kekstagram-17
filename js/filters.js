'use strict';
(function () {

  var popular = document.querySelector('#filter-popular');
  var random = document.querySelector('#filter-new');
  var discussed = document.querySelector('#filter-discussed');
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

  var sortPhotos = function (sortingFunc, sortingClass) {
    removePhoto();
    removeActiveFilter();
    var newPics = window.photos.slice().sort(sortingFunc);
    window.debounce.setDebounce(window.renderPics(newPics));
    sortingClass.classList.add('img-filters__button--active');
  };

  var popularChangeHandler = function () {
    sortPhotos(sortingPopular, popular);
  };

  var discussedChangeHandler = function () {
    sortPhotos(sortingDiscussed, discussed);
  };

  var randomChangeHandler = function () {
    sortPhotos(sortingRandom, random);
  };

  popular.addEventListener('click', popularChangeHandler);
  discussed.addEventListener('click', discussedChangeHandler);
  random.addEventListener('click', randomChangeHandler);

})();

