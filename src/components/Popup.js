export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(`.${this._selector}`);
  }
  open() {
    this._popup.classList.add(`popup_opened`);
    document.addEventListener('keydown', this._handleEscCloseBind);
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
    console.log(evt.key);
    if (evt.key == 'Escape')
    this.close(evt);
  }
  setEventListeners() {
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    this._closeBind = this.close.bind(this);
    this._popup.addEventListener('click', this._closeBind);
  }
}
export {Popup};
