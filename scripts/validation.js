export default class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener('input', function (evt) {
      evt.preventDefault();
    });
    this._formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__field'));
    this._buttonElement = this._formElement.querySelector('.popup__submit-button');
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._inputElement.addEventListener('input', function () {
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState(){
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add('popup__submit-button_inactive');
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove('popup__submit-button_inactive');
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this._showInputError(this._inputElement.validationMessage);
    } else {
      this._hideInputError();
    }
  }

  _showInputError(errorMessage) {
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = errorMessage;
    this._inputElement.classList.add('popup__field_type_error');
  }
  
  hideInputError() {
    this._errorElement = formElement.querySelector(`#${this._inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._inputElement.classList.remove('popup__field_type_error');
  }
}