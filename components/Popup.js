export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(`.${this._selector}`);
  }
  open() {
    this._popup.classList.add(`popup_opened`);
    this.setEventListeners();
  }
  close() {
    document.querySelector(`.popup_opened`).classList.remove(`popup_opened`);
    document.removeEventListener('keydown', this._handleEscCloseBind);
    this._popup.removeEventListener('click', this.closeBind);
  }
  _handleEscClose(evt) {
    if (evt.key == 'Escape' || evt.type == 'submit' || evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-image"))
    this.close();
  }
  setEventListeners() {
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    this.closeBind = this.close.bind(this);
    this._popup.addEventListener('click', this.closeBind);
    document.addEventListener('keydown', this._handleEscCloseBind);
  }
}