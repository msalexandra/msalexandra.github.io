import {resetMainPin} from './map.js';
import {resetSlider, pristine} from './validation.js';
import {getLocationToString, filterAd} from './map.js';

const AD_FORM = document.querySelector('.ad-form');
const photosContainer = document.querySelector('.ad-form__photo');
const preview = document.querySelector('.ad-form-header__preview');
const avatarImg = preview.querySelector('img');
const avatar = document.querySelector('#avatar');
const photos = document.querySelector('#images');
const resetBtn = document.querySelector('.ad-form__reset');
const submitBtn = document.querySelector('.ad-form__submit');
const mainPinLocation = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');

const MAIN_LOCATION = {
  lat: 35.675178,
  lng: 139.748876,
};

const NUMBER_AFTER_POINT = 5;


const createImage = (files) => {
  const reader = new FileReader();
  const div = document.createElement('div');
  const photo = document.createElement('img');
  div.classList.add('ad-form__photo');
  div.classList.add('photo');
  reader.addEventListener('load', () => {
    photo.src = reader.result;
    photo.style.width = '70px';
    photo.style.height = '70px';
    div.append(photo);
    photosContainer.append(div);
  });
  if (files) {
    return reader.readAsDataURL(files);
  }
  photo.src = 'img/muffin-grey.svg';
};

const createAvatar = (file) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    avatarImg.src = reader.result;
  });
  if (file) {
    reader.readAsDataURL(file);
  }
  avatarImg.src = 'img/muffin-grey.svg';
};

const handleFileSelect = (evt) => {
  const file = evt.target.files[0];
  createAvatar(file);
};

const handleMultiFileSelect = (evt) => {
  const files = evt.target.files;
  Array.from(files).forEach((file) => {
    createImage(file);
  });
};

const resetForm = (evt) => {
  evt.preventDefault();
  AD_FORM.reset();
  pristine.reset();
  filterForm.reset();
  filterAd();
  avatar.files.value = 'img/muffin-grey.svg';
  avatarImg.src = 'img/muffin-grey.svg';
  photos.files.value='';
  const userPhotos = document.querySelectorAll('.photo');
  userPhotos.forEach((element) => element.remove());
  mainPinLocation.value = getLocationToString(MAIN_LOCATION, NUMBER_AFTER_POINT);
  resetMainPin();
  resetSlider();
};

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка формы';
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Опубликовать';
};

resetBtn.addEventListener('click', resetForm);


avatar.addEventListener('change', handleFileSelect, false);
photos.addEventListener('change', handleMultiFileSelect, false);

export {resetForm, blockSubmitButton, unblockSubmitButton, resetBtn};
