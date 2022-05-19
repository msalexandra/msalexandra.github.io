const isEscapeKey = (evt) => evt.key === ('Escape' || 'Esc');

const mainDocument = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const onMessageSuccessEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessSendMessage();
  }
};

const onMouseSuccessClickDown = () => {
  closeSuccessSendMessage();
};

const openSuccessSendMessage = () => {

  mainDocument.appendChild(successElement);

  mainDocument.addEventListener('keydown', onMessageSuccessEscDown);
  successElement.addEventListener('click', onMouseSuccessClickDown);
};

function closeSuccessSendMessage () {
  const sendButton = document.querySelector('.ad-form__submit');
  sendButton.disabled = false;

  mainDocument.removeChild(successElement);

  mainDocument.removeEventListener('keydown', onMessageSuccessEscDown);
  successElement.removeEventListener('mousedown', onMouseSuccessClickDown);
}


const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorGetElement = errorTemplate.cloneNode(true);
const closeButton = errorGetElement.querySelector('.error__button');

const onMessageErrorEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorSendMessage();
  }
};

const onMouseErrorClickDown = () => {
  closeErrorSendMessage();
};

const openErrorSendMessage = () => {
  mainDocument.appendChild(errorGetElement);

  closeButton.addEventListener('click', onMouseErrorClickDown);
  mainDocument.addEventListener('keydown', onMessageErrorEscDown);
};

function closeErrorSendMessage () {
  mainDocument.removeChild(errorGetElement);

  mainDocument.removeEventListener('keydown', onMessageErrorEscDown);
  errorGetElement.removeEventListener('mousedown', onMouseErrorClickDown);
}

export {openSuccessSendMessage, openErrorSendMessage};

