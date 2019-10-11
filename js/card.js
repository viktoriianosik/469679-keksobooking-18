'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');

  var getOfferTypeCaption = function (type) {
    switch (type) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
      default:
        type = 'Нет такого формата';
        break;
    }
    return type;
  };

  var renderPhotos = function (photosArray) {
    var fragment = document.createDocumentFragment();
    var photo = card.querySelector('.popup__photo');
    for (var i = 1; i < photosArray.length; i++) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = photosArray[i];
      fragment.appendChild(newPhoto);
    }
    return fragment;
  };

  var renderCard = function (advert) {
    var newCard = card.cloneNode(true);
    var features = newCard.querySelectorAll('.popup__feature');
    var featuresFromService = advert.offer.features;

    newCard.querySelector('.popup__title').textContent = advert.offer.title;
    newCard.querySelector('.popup__text--address').textContent = advert.offer.address;
    newCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = getOfferTypeCaption(advert.offer.type);
    newCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    newCard.querySelector('.popup__description').textContent = advert.offer.description;
    newCard.querySelector('.popup__avatar').src = advert.author.avatar;
    newCard.querySelector('.popup__photo').src = advert.offer.photos[0];
    newCard.querySelector('.popup__photos').appendChild(renderPhotos(advert.offer.photos));

    for (var i = 0; i < features.length; i++) {
      features[i].style.display = 'none';
    }

    for (i = 0; i < featuresFromService.length; i++) {
      newCard.querySelector('.popup__feature--' + featuresFromService[i]).style.display = 'inline-block';
    }

    return newCard;
  };

  window.renderAdvert = function () {
    var filterContainer = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(window.newAdverts[0]));
    filterContainer.before(fragment);
  };

})();
