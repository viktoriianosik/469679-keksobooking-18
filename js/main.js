'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var adverts = [];

var chooseRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var chooseRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

var createRandomArray = function (array) {
  var newAmount = chooseRandomInRange(1, array.length);
  var newArray = shuffle(array);
  newArray = newArray.slice(0, newAmount);
  return newArray;
};

var createRandomAdvert = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + i + '.png',
    },
    location: {
      x: chooseRandomInRange(50, 930),
      y: chooseRandomInRange(130, 630),
    },
    offer: {
      title: 'Заголовок',
      address: 'location.x, location.y',
      price: chooseRandomInRange(200,1000),
      type: chooseRandom(TYPE),
      rooms: chooseRandomInRange(1,4),
      guests: chooseRandomInRange(2,10),
      checkin: chooseRandom(TIME),
      checkout: chooseRandom(TIME),
      features: createRandomArray(FEATURES),
      description: 'строка с описанием',
      photos: createRandomArray(PHOTOS),
    }
  };
};

var generateAdverts = function (n) {
  var adverts = [];
  for (var i = 1; i <= n; i++) {
    adverts.push(createRandomAdvert(i));
  }
  return adverts;
};

var renderPin = function (advert) {
  var pinElement = pin.cloneNode(true);
  pinElement.style.left = advert.location.x + 'px';
  pinElement.style.top = advert.location.y + 'px';
  pinElement.querySelector('img').src = advert.author.avatar;
  pinElement.querySelector('img').alt = advert.offer.title;
  return pinElement;
};

var renderAdvPin = function (advert) {
  map.classList.remove('map--fadded');

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(advert[i]));
  }

  mapPins.appendChild(fragment);
};

adverts = generateAdverts(8);
renderAdvPin(adverts);
