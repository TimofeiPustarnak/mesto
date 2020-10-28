export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(`.${this._selector}`);
  }
  open() {
    this.setEventListeners();
    this._popup.classList.add(`${this._selector}_opened`);
  }
  close() {
    document.querySelector(`.${this._selector}_opened`).classList.remove(`${this._selector}_opened`);
    document.removeEventListener('keydown', this._handleEscCloseBind);
  }
  _handleEscClose(evt) {
    if (evt.key == 'Escape' || evt.type == 'submit' || evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-image"))
    this.closePopup();
  }
  setEventListeners() {
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._handleEscCloseBind);
  }
}