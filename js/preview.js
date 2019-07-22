'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var comm = document.querySelector('.text__description');
  var hashtags = document.querySelector('.text__hashtags');

  var onImgUploadEscPress = function (evt) {
    if (comm !== document.activeElement && evt.keyCode === ESC_KEYCODE 
      && hashtags !== document.activeElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onImgUploadEscPress);
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  imgUploadCancel.addEventListener('click', function () {
    closePopup();
  });
})();

