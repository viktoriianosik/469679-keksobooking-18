'use strict';

(function () {
  var filter = document.querySelector('.map__filters-container');
  var housingType = filter.querySelector('#housing-type');
  var mapPins = document.querySelector('.map__pins');

  var filterPins = function (adverts) {
    if (housingType.value === 'any') {
      return adverts;
    } else {
      return adverts.filter(function (advert) {
        return advert.offer.type === housingType.value;
      });
    }
  };

  housingType.addEventListener('change', function () {
    mapPins.removeChild(window.fragment);
    window.pin.renderPins(filterPins(window.data));
  });

})();
