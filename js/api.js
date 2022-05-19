import {resetForm} from './form.js';
const ServerUrl = {
  GET_URL: 'https://25.javascript.pages.academy/keksobooking/data',
  POST_URL: 'https://25.javascript.pages.academy/keksobooking',
};

const ERROR_TIME = 2000;

//Выводим сообщение об ошибке


const showError = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.width = '300px';
  errorContainer.style.right = '50%';
  errorContainer.style.transform = 'translateX(50%)';
  errorContainer.style.top = '55px';

  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '12px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = '#ffaa99';

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  },
  ERROR_TIME);
};

const getAds = async (onError) => {
  const response = await fetch(
    ServerUrl.GET_URL,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  );
  if (response.ok) {
    const allAds = await response.json();
    return allAds;
  } else {
    onError();
    return [];
  }
};


/*
const getAds = async (onError) => {
  let response;
  try {
    response = await fetch(
      ServerUrl.GET_URL,
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    );
  }
  catch (err) {
    onError();
    return [];
  }

  const allAds = await response.json();
  return allAds;
}; */


const sendData = (onSuccess, onError, body) => {
  fetch (
    ServerUrl.POST_URL,
    {
      method: 'POST',
      body,
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess();
      resetForm();
    } else {
      onError('Не удалось отправить форму. Пожалуйста, попробуйте еще раз');
    }
  }).catch(() => {
    onError('Не удалось отправить форму. Пожалуйста, попробуйте еще раз');
  });
};

export {getAds, sendData, showError};
