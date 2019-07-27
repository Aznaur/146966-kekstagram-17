'use strict';
(function () {
  // Отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 50000;
    xhr.open('POST', 'https://js.dump.academy/kekstagram');

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

    xhr.send(data);
  };


  var URL = 'https://js.dump.academy/kekstagram/data';
  // Получение данных от сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 50000;
    xhr.open('GET', URL);

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
    xhr.send();
  };

  window.backend = {
    sendToServer: save,
    sendFromServer: load
  };

})();

