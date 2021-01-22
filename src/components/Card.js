export default class Card { 
  constructor(text, link, template, popupWithImage, likesCounter, openPopup, isMy, popupClose, id) { 
    this._text = text; 
    this._link = link; 
    this._template = template; 
    this._cardTemplate = document.querySelector(this._template).content.cloneNode(true);
    this._popupWithImage = popupWithImage; 
    this._likeButton = this._cardTemplate.querySelector('.elements__like');
    this._deleteButton = this._cardTemplate.querySelector('.elements__delete');
    this._likesCounter = likesCounter;
    this._openPopup = openPopup;
    this._isMy = isMy;
    this._popupClose = popupClose;
    this._id = id;
  } 
 
  _createCard() {  
      this._cardTemplate.querySelector('.elements__title').textContent = this._text; 
      this._cardTemplate.querySelector('.elements__like-counter').textContent = this._likesCounter;
      this._cardImage = this._cardTemplate.querySelector('.elements__image'); 
      this._cardImage.src = this._link; 
      this._cardImage.alt = this._text; 
      this._renderCard(this._link, this._text); 
  } 
 
  _like() {
    this._likeButton.classList.toggle('elements__like_active'); 
  }

  _delete() {
    this._openPopup();
    this._popupClose.querySelector('.popup__submit-button-close').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._deleteButton.closest('.elements__element').remove(); 
      this._popupClose.classList.remove(`popup_opened`);
      fetch(`https://mesto.nomoreparties.co/v1/cohort-19/cards/${this._id}`, {
        method: 'DELETE',
        headers: {
          authorization: 'e7c816a7-6326-4823-aa23-7ff97d0294f3',
        }
      })
    })
  }

  _renderCard (link, text) { 
      this._likeBind = this._like.bind(this);
      this._deleteBind = this._delete.bind(this);
      this._likeButton.addEventListener('click', this._likeBind); 
      this._cardImage.addEventListener('click', () => { 
      this._popupWithImage.open(link, text); 
      }); 
      if (this._isMy) {
        this._deleteButton.addEventListener('click', this._deleteBind); 
      }else{
        this._deleteButton.style.display = 'none';
      }
  } 
  getTemplate() { 
    this._createCard(); 
    return this._cardTemplate; 
  } 
} 