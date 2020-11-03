import {Popup} from '../pages/index.js';
export default class PopupWithImage extends Popup {
  constructor(selector,{imageInPopup, popupImageTitle}) {
    super(selector);
    this._imageInPopup = imageInPopup;
    this._popupImageTitle = popupImageTitle;
  }
  open(link, text) {
    super.open();
    this._imageInPopup.src = link;
    this._imageInPopup.alt = text;
    this._popupImageTitle.textContent = text;
  }
}