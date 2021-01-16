import Popup from '../components/Popup.js';
export default class PopupWithForm extends Popup {
  constructor (selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._popupCardFields = Array.from(this._popup.querySelectorAll('.popup__field'));
    this._inputs = Array.from(this._popup.querySelectorAll('input'));
  }
  // _getInputValues() {
  //   return this._getInputsWithoutButtons().map((input) => {
  //     return input.value;
  //   });;
  // }

  _getInputsWithoutButtons() {
    return this._inputs.filter((input) => {
      return input.getAttribute('type') != 'submit';
    });
  }

  _submitHandler(evt) {
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
      this._getInputsWithoutButtons().forEach(element => {
        element.value = '';
      });
    }
  }
}  


