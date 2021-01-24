import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, formSubmit, button) {
    super(selector);
    this._button = document.querySelector(`#${button}`);
    this._buttonContent = this._button.value;
    this._formSubmit = formSubmit;
    this._popupCardFields = Array.from(
      this._popup.querySelectorAll(".popup__field")
    );
    this._inputs = Array.from(this._popup.querySelectorAll("input"));
  }
  // _getInputValues() {
  //   return this._getInputsWithoutButtons().map((input) => {
  //     return input.value;
  //   });;
  // }

  _getInputsWithoutButtons() {
    return this._inputs.filter((input) => {
      return input.getAttribute("type") != "submit";
    });
  }

  _submitHandler(evt) {
    this._button.value = "Сохранение...";
    this._formSubmit();
    // this.close(evt);
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitHandlerBind = this._submitHandler.bind(this);
    this._popup.addEventListener("submit", this._submitHandlerBind);
  }

  // close(evt) {
  //   super.close(evt);
  //   if (this._closeCheck(evt)) {
  //     this._getInputsWithoutButtons().forEach((element) => {
  // element.value = "";
  //     });
  //   }
  // }

  closeWithoutCheck() {
    this._popup.classList.remove(`popup_opened`);
    document.removeEventListener("keydown", this._handleEscCloseBind);
    this._getInputsWithoutButtons().forEach((element) => {
      element.value = "";
    });
  }

  closeWithoutCheckAndClearInputs() {
    this._popup.classList.remove(`popup_opened`);
    document.removeEventListener("keydown", this._handleEscCloseBind);
  }

  buttonLoadingReset() {
    this._button.value = this._buttonContent;
  }
}
