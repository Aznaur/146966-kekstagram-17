'use strict';

function randomInteger(min, max) {
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
for (var i = 0; i < 6; i++) {
  comments.push({
    avatar: 'mig/avatar-' + (i + 1) + '.svg',
    message: messages[i],
    name: authorNames[i]
  });
}

var publishedPhotos = [];
for (var j = 0; j < 25; j++) {
  publishedPhotos.push({
    url: 'photos/' + (j + 1) + '.jpg',
    likes: randomInteger(15, 200),
    comment: comments[randomInteger(0, comments.length - 1)]
  });
}

var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


var renderWizard = function (wizard) {
  var wizardElement = pictureTemplate.cloneNode(true);
  wizardElement.href = wizard.url;
  wizardElement.querySelector('.picture__img').src = wizard.url;
  wizardElement.querySelector('.picture__comments').textContent = randomInteger(1, 10);
  wizardElement.querySelector('.picture__likes').textContent = wizard.likes;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var p = 0; p < publishedPhotos.length; p++) {
  fragment.appendChild(renderWizard(publishedPhotos[p]));
}

picturesElement.appendChild(fragment);
