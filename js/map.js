import {createOffer} from './offer.js';
import {getAds, showError} from './api.js';
import {getDisableForm, disableMapFilters} from './form-swicher.js';
import {checkAllFilters} from './filter.js';
import {debounce} from './util.js';

const address = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');

const COUNT_ADS = 10;
const allAds = [];

const START_MAP_SCALING = 12;

const MAIN_LOCATION = {
  lat: 35.675178,
  lng: 139.748876,
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const getLocationToString = (obj, number) => {
  let {lat, lng} = obj;
  lat = Number(lat.toFixed(number));
  lng = Number(lng.toFixed(number));
  return `${lat}, ${lng}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    getDisableForm(false);
  })
  .setView(MAIN_LOCATION, START_MAP_SCALING);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавление нашей метки на карту

const mainPinMarker = L.marker(
  MAIN_LOCATION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);
address.value = getLocationToString(mainPinMarker.getLatLng(), 5);

mainPinMarker.on('drag', (evt) => {
  address.value = getLocationToString(evt.target.getLatLng(), 5);
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: adPinIcon,
    }
  );
  marker.addTo(markerGroup).bindPopup(createOffer(ad));
};

const resetMainPin = () => {
  mainPinMarker.setLatLng(MAIN_LOCATION);
  map.setView(MAIN_LOCATION, START_MAP_SCALING);
  map.closePopup();
};

(async () => {
  const fetchedAds = await getAds(() => showError('Не удалось загрузить данные'));
  allAds.push(...fetchedAds);
  allAds.slice(0, COUNT_ADS).forEach((ad) => {
    createMarker(ad);
    disableMapFilters(false);
  });
})();


const filterAd = () => {
  markerGroup.clearLayers();
  const filteredAds = allAds.filter((ad) => checkAllFilters(ad));
  filteredAds.slice(0, COUNT_ADS).forEach((ad) => {
    createMarker(ad);
  });
};

filterForm.addEventListener('change', debounce(filterAd));

export {resetMainPin, getLocationToString, MAIN_LOCATION, filterAd};
