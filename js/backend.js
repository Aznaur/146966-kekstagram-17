'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var METHOD_POST = 'POST';
  var METHOD_GET = 'GET';
  var typeRespons = 'json';

  var createRequest = function (onLoad, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = typeRespons;
    xhr.timeout = 50000;
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    sendToServer: createRequest,
    urlSave: URL_SAVE,
    urlLoad: URL_LOAD,
    methodPost: METHOD_POST,
    methodGet: METHOD_GET
  };

})();

