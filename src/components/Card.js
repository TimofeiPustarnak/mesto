export default class Card { 
  constructor(text, link, template, popupWithImage) { 
    this._text = text; 
    this._link = link; 
    this._template = template; 
    this._cardTemplate = document.querySelector(this._template).content.cloneNode(true);
    this._popupWithImage = popupWithImage; 
    this._likeButton = this._cardTemplate.querySelector('.elements__like');
    this._deleteButton = this._cardTemplate.querySelector('.elements__delete');
  } 
 
  _createCard() {  
      this._cardTemplate.querySelector('.elements__title').textContent = this._text; 
      this._cardImage = this._cardTemplate.querySelector('.elements__image'); 
      this._cardImage.src = this._link; 
      this._cardImage.alt = this._text; 
      this._renderCard(this._link, this._text); 
  } 
 
  _like() {
    this._likeButton.classList.toggle('elements__like_active'); 
  }

  _delete() {
    this._deleteButton.closest('.elements__element').remove(); 
  }

  _renderCard (link, text) { 
    this._likeBind = this._like.bind(this);
    this._deleteBind = this._delete.bind(this);
    this._likeButton.addEventListener('click', this._likeBind); 
    this._deleteButton.addEventListener('click', this._deleteBind); 
    this._cardImage.addEventListener('click', () => { 
      this._popupWithImage.open(link, text); 
    }); 
  } 
  getTemplate() { 
    this._createCard(); 
    return this._cardTemplate; 
  } 
} 