import {Popup} from '../pages/index.js';
import {checkFieldsValid} from '../components/validation.js';
export default class PopupWithForm extends Popup {
  constructor (selector, checkFieldsValid) {
    super(selector);
    this._checkFieldsValid = checkFieldsValid;
    this._popupCardFields = Array.from(this._popup.querySelectorAll('.popup__field'));
  }
}