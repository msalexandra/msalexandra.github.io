import './offer.js';
import './util.js';
import './map.js';
import './form.js';
import './map.js';
import {setUserFromSubmit} from './validation.js';
import {openSuccessSendMessage, openErrorSendMessage} from './popup.js';
import './api.js';
import './form-swicher.js';
import './filter.js';

setUserFromSubmit(openSuccessSendMessage, openErrorSendMessage);
