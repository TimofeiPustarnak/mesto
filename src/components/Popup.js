export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(`.${this._selector}`);
    this._closeBind = this.close.bind(this);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add(`popup_opened`);
    document.addEventListener('keydown', this._handleEscCloseBind);
    //для вебпака index.js должен же прям в src лежать, разве нет?
  }
  close(evt) {
    if (this._closeCheck(evt)){
      this._popup.classList.remove(`popup_opened`);
      document.removeEventListener('keydown', this._handleEscCloseBind);
    }
  }

  _closeCheck(evt)  {
    return evt.key == 'Escape' || evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-image") || evt.type == 'submit';
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape')
    this.close(evt);
  }
  setEventListeners() {
    this._popup.addEventListener('click', this._closeBind);
  }
}