'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_HEIGHT_WITH_ARROW = PIN_HEIGHT + 22;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adFormHeaderInput = document.querySelector('.ad-form-header__input');
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var disabledForm = function () {
    adFormHeaderInput.setAttribute('disabled', 'disabled');
    for (var i = 0; i < adFormElement.length; i++) {
      adFormElement[i].setAttribute('disabled', 'disabled');
    }
  };

  var getEnableForm = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormHeaderInput.removeAttribute('disabled', 'disabled');
    for (var i = 0; i < adFormElement.length; i++) {
      adFormElement[i].removeAttribute('disabled', 'disabled');
    }
  };

  var setAddress = function (centerX, centerY) {
    address.readOnly = true;
    address.value = Math.floor(parseInt(pinMain.style.left, 10) + centerX) + ', ' + Math.floor(parseInt(pinMain.style.top, 10) + centerY);
  };

  var chooseCapacity = function () {
    if (roomNumber.value === '1' && capacity.value !== '1') {
      return capacity.setCustomValidity('Количество гостей не может быть больше 1!');
    }

    if ((roomNumber.value === '2') && (capacity.value !== '1' && capacity.value !== '2')) {
      return capacity.setCustomValidity('Количество гостей не может быть больше 2!');
    }

    if (roomNumber.value === '3' && capacity.value === '0') {
      return capacity.setCustomValidity('Только для гостей!');
    }

    if (roomNumber.value === '100' && capacity.value !== '0') {
      return capacity.setCustomValidity('Не для гостей!');
    } else {
      return capacity.setCustomValidity('');
    }
  };

  disabledForm();
  setAddress(PIN_WIDTH / 2, PIN_HEIGHT / 2);

  pinMain.addEventListener('mousedown', function () {
    getEnableForm();
    setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITH_ARROW);
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      getEnableForm();
      setAddress(PIN_WIDTH / 2, PIN_HEIGHT_WITH_ARROW);
    }
  });

  capacity.addEventListener('change', function () {
    chooseCapacity();
  });
})();
