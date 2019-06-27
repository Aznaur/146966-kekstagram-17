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

var publishedPhotos = [];
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


var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


var renderWizard = function (photo) {
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
    fragment.appendChild(renderWizard(publishedPhotos[p]));
  }
  return fragment;
};

picturesElement.appendChild(appendPhotoElement());

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
});

imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');


for (var i = 0; i < effectsRadio.length; i++) {
  clickControl(effectsRadio[i]);
}

function toggleFilter(control) {
  for (var j = 0; j < effectsRadio.length; j++) {
    imgPreview.classList.remove(effectsRadio[j].dataset.filter);
  }

  if (imgPreview) {
    imgPreview.classList.add(control.dataset.filter);
  }
}

function clickControl(control) {
  control.addEventListener('click', function () {
    toggleFilter(control);
  });
}

var controlMin = document.querySelector('.scale__control--smaller');
var controlMax = document.querySelector('.scale__control--bigger');
var controlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var STEP = 25;


// Не смог сообразить как объединить эти две функции, сделал по отдельности
var scaleOut = function () {
  var presentValue = parseInt(controlValue.getAttribute('value'), 10);
  if (presentValue > 25) {
    presentValue = presentValue - STEP;
    controlValue.setAttribute('value', presentValue + '%');
    imgUploadPreview.style.transform = 'scale(' + (presentValue / 100) + ')';
  }
};

var scaleUp = function () {
  var presentValue = parseInt(controlValue.getAttribute('value'), 10);
  if (presentValue < 100) {
    presentValue = presentValue + STEP;
    controlValue.setAttribute('value', presentValue + '%');
    imgUploadPreview.style.transform = 'scale(' + (presentValue / 100) + ')';
  }
};

controlMin.addEventListener('click', function () {
  scaleOut();
});

controlMax.addEventListener('click', function () {
  scaleUp();
});
