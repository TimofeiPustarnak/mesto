import {Popup} from '../pages/index.js';
import {checkFieldsValid} from '../components/validation.js';
export default class PopupWithForm extends Popup {
  constructor (selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._popupCardFields = Array.from(this._popup.querySelectorAll('.popup__field'));
    
  }
  _getInputValues() {
    return Array.from(this._popup.querySelectorAll('input').values);
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      if (checkFieldsValid(this._popupCardFields))
        this._formSubmit();
        this.close();
      });
  }
}  


