'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var renderPin = function (advert) {
    var pinElement = pin.cloneNode(true);
    pinElement.style.left = advert.location.x + 'px';
    pinElement.style.top = advert.location.y + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    return pinElement;
  };

  var renderFragment = function (adverts) {
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(renderPin(adverts[i]));
    }

    mapPins.appendChild(fragment);
  };

  var adverts = window.generateAdverts(8);
  renderFragment(adverts);
})();
