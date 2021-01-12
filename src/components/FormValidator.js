export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._fieldClass = data.fieldClass;
    this._buttonClass = data.buttonClass;
    this._buttonInactiveClass = data.buttonInactiveClass;
    this._errorClass = data.errorClass;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getButtonDisabled();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._fieldClass));
    this._buttonElement = this._formElement.querySelector(this._buttonClass);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  }

  _getButtonDisabled() {
    this._buttonElement.classList.add(this._buttonInactiveClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._getButtonDisabled();
    } else {
      this._buttonElement.classList.remove(this._buttonInactiveClass);
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
    inputElement.classList.add(this._errorClass);
  }
  
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = '';
    inputElement.classList.remove(this._errorClass);
  }
}

export function checkFieldsValid(fieldsList) {
  return !fieldsList.some(elem => elem.validity.valid == false);
}