'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (advert) {
    var pinElement = pin.cloneNode(true);
    pinElement.style.left = advert.location.x + 'px';
    pinElement.style.top = advert.location.y + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    return pinElement;
  };

  window.pin.renderPins = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    window.fragment = document.createElement('div');

    for (var i = 0; i < takeNumber; i++) {
      window.fragment.appendChild(renderPin(data[i]));
    }

    mapPins.appendChild(window.fragment);
    window.renderAdvert();
  };

})();
