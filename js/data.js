'use strict';
(function () {
  window.randomInteger = function (min, max) {
    var rand = Math.floor(min + Math.random() * (max - min + 1));
    rand = Math.round(rand);
    return rand;
  }

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var authorNames = ['Артем', 'Алексей', 'Василий', 'Аня', 'Настя', 'Коля'];

  var comments = [];
  var getCommentsPhotos = function () {
    for (var i = 0; i < 6; i++) {
      comments.push({
        avatar: 'mig/avatar-' + (i + 1) + '.svg',
        message: messages[i],
        name: authorNames[i]
      });
    }
    return comments;
  };
  comments = getCommentsPhotos();

  window.publishedPhotos = [];
  var getArrayPhotos = function () {
    for (var j = 0; j < 25; j++) {
      publishedPhotos.push({
        url: 'photos/' + (j + 1) + '.jpg',
        likes: randomInteger(15, 200),
        comment: comments[randomInteger(0, comments.length - 1)]
      });
    }
    return publishedPhotos;
  };
  publishedPhotos = getArrayPhotos();
})();

