const OFFERCARDTEMPLATE = document.querySelector('#card').content;
const TEMPLATE = OFFERCARDTEMPLATE.querySelector('.popup');
const PHOTO_TEMPLATE = OFFERCARDTEMPLATE.querySelector('.popup__photo');

const hideAdd = (element) => {
  element.classList.add('hidden');
};
const addValue = (element, value) => {
  element.textContent = value;
};


const TYPE = {
  flat: 'Квартира',
  bungalow:'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const createOffer = ({offer, author}) => {
  const element = TEMPLATE.cloneNode(true);
  if (offer.title) {
    addValue(element.querySelector('.popup__title'), offer.title);
  } else {
    hideAdd(element.querySelector('.popup__title'));
  }

  if (offer.adress) {
    addValue(element.querySelector('.popup__text--address'), offer.adress);
  } else {
    hideAdd(element.querySelector('.popup__text--address'));
  }

  if (offer.price) {
    addValue(element.querySelector('.popup__text--price'), `${offer.price} ₽/ночь`);
  } else {
    hideAdd(element.querySelector('.popup__text--price'));
  }

  if (offer.type) {
    addValue(element.querySelector('.popup__type'), TYPE[offer.type]);
  } else {
    hideAdd(element.querySelector('.popup__type'));
  }

  if (offer.rooms && offer.guests) {
    addValue(element.querySelector('.popup__text--capacity'), `${offer.rooms} комнаты для ${offer.guests} гостей`);
  } else {
    hideAdd(element.querySelector('.popup__text--capacity'));
  }

  if (offer.checkin && offer.checkout) {
    addValue(element.querySelector('.popup__text--time'), `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  } else {
    hideAdd(element.querySelector('.popup__text--time'));
  }

  if (offer.features) {
    element.querySelectorAll('.popup__feature').forEach((featureItems) => {
      const isNecessary = offer.features.some(
        (feature) => featureItems.classList.contains(`popup__feature--${feature}`)
      );
      if (!isNecessary) {
        featureItems.remove();
      }
    });
  } else {
    hideAdd(element.querySelector('.popup__features'));
  }

  if (offer.description) {
    addValue(element.querySelector('.popup__description'), offer.description);
  } else {
    hideAdd(element.querySelector('.popup__description'));
  }

  if(offer.photos) {
    element.querySelector('.popup__photos').innerHTML = '';
    offer.photos.forEach( (photo) => {
      const item = PHOTO_TEMPLATE.cloneNode(true);
      item.src = photo;
      element.querySelector('.popup__photos').append(item);
    });
  } else {
    hideAdd(element.querySelector('.popup__photos'));
  }

  if (author.avatar) {
    element.querySelector('.popup__avatar').src = author.avatar;
  } else {
    hideAdd(element.querySelector('.popup__avatar'));
  }
  return element;
};


export {createOffer};


