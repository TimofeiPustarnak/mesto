export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(`.${this._selector}`);
  }
  open() {
    this.setEventListeners();
    this._popup.classList.add(`popup_opened`);
  }
  close() {
    document.querySelector(`.popup_opened`).classList.remove(`popup_opened`);
    document.removeEventListener('keydown', this._handleEscCloseBind);
  }
  _handleEscClose(evt) {
    if (evt.key == 'Escape' || evt.type == 'submit' || evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-image"))
    this.close();
  }
  setEventListeners() {
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._handleEscCloseBind);
  }
}