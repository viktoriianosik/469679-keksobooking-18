'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  var shuffle = function (arr) {
    var cmp = function () {
      return 0.5 - Math.random();
    };
    return arr.sort(cmp);
  };

  var renderPin = function (advert) {
    var pinElement = pin.cloneNode(true);
    pinElement.style.left = advert.location.x + 'px';
    pinElement.style.top = advert.location.y + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    return pinElement;
  };

  var renderFragment = function (adverts) {
    var fragment = document.createDocumentFragment();
    shuffle(adverts);

    for (var i = 0; i < 8; i++) {
      fragment.appendChild(renderPin(adverts[i]));
    }

    mapPins.appendChild(fragment);
  };

  var errorMessage = function () {
    var main = document.querySelector('main');
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = error.cloneNode(true);
    main.appendChild(errorBlock);
  };

  window.backend.load(renderFragment, errorMessage);
})();
