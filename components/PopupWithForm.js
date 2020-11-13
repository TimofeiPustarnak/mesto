import {Popup} from '../pages/index.js';
import {checkFieldsValid} from '../components/validation.js';
export default class PopupWithForm extends Popup {
  constructor (selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._popupCardFields = Array.from(this._popup.querySelectorAll('.popup__field'));
    
  }
  _getInputValues() {
    return this._getInputsWithoutButtons().map((input) => {
      return input.value;
    });;
  }

  _getInputsWithoutButtons() {
    return Array.from(this._popup.querySelectorAll('input')).filter((input) => {
      return input.getAttribute('type') != 'submit';
    });
  }

  _submitHandler(evt) {
    if (checkFieldsValid(this._popupCardFields))
      this._formSubmit();
      this.close(evt);
    };

  setEventListeners() {
    super.setEventListeners();
    this._submitHandlerBind = this._submitHandler.bind(this)
    this._popup.addEventListener('submit', this._submitHandlerBind);
  }

  close(evt) {
    super.close(evt);
    if (this._closeCheck(evt)) {
      this._popup.removeEventListener('submit', this._submitHandlerBind);
      this._getInputsWithoutButtons().forEach(element => {
        element.value = '';
      });
    }
  }
}  


