export default class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._fieldClass = data.fieldClass;
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
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
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

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__field_type_error');
  }
  
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = '';
    inputElement.classList.remove('popup__field_type_error');
  }
}