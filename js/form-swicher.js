const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');
const mapFilterSelects = mapFilter.querySelectorAll('select');

const toggleElements = (element, isDisabled) => {
  element.forEach((item) => {
    item.disabled = isDisabled;
  });
};

const getDisableForm = (isDisabled) => {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  toggleElements(adFormFieldsets, isDisabled);
};

const disableMapFilters = (isDisabled) => {
  mapFilter.classList.toggle('map__filters--disabled', isDisabled);
  toggleElements(mapFilterSelects, isDisabled);
  toggleElements(mapFilterFieldsets, isDisabled);
};

export {getDisableForm, disableMapFilters};

/*
const getDisableForm = (isDisabled) => {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  mapFilter.classList.toggle('map__filters--disabled', isDisabled);
  adFormFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });
  mapFilterSelects.forEach((item) => {
    item.disabled = isDisabled;
  });
  mapFilterFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });
}; */
