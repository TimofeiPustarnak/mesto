export default class Card {
  constructor(text, link, template, popupWithImage) {
    this._text = text;
    this._link = link;
    this._template = template;
    this._cardsTemplate = document.querySelector(this._template).content;
    this._popupWithImage = popupWithImage;
  }

  _createCard() {
      this._cardTemplate = this._cardsTemplate.cloneNode(true);
      this._cardTemplate.querySelector('.elements__title').textContent = this._text;
      this._cardImage = this._cardTemplate.querySelector('.elements__image');
      this._cardImage.src = this._link;
      this._cardImage.alt = this._text;
      this._renderCard(this._link, this._text);
  }

  _renderCard (link, text) {
    this._cardTemplate.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
    });
    this._cardTemplate.querySelector('.elements__delete').addEventListener('click', function (evt) {
      evt.target.closest('.elements__element').remove();
    });

    this._cardImage.addEventListener('click', () => {
      // openPopup(popupImage);
      // imageInPopup.src = link;
      // imageInPopup.alt = text;
      // popupImageTitle.textContent = text;
      this._popupWithImage.open(link, text);
    });
  }
  getTemplate() {
    this._createCard();
    return this._cardTemplate;
  }
}