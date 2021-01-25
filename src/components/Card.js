export default class Card {
  constructor(
    text,
    link,
    template,
    popupWithImage,
    likesCounter,
    openPopup,
    isMy,
    popupClose,
    popupCloseWithoutCheck,
    id,
    likeCard,
    unlike,
    deleteCard
  ) {
    this._text = text;
    this._link = link;
    this._template = template;
    this._cardTemplate = document
      .querySelector(this._template)
      .content.cloneNode(true);
    this._popupWithImage = popupWithImage;
    this._likeButton = this._cardTemplate.querySelector(".elements__like");
    this._likeCounter = this._cardTemplate.querySelector(
      ".elements__like-counter"
    );
    this._deleteButton = this._cardTemplate.querySelector(".elements__delete");
    this._likesCounter = likesCounter;
    this._openPopup = openPopup;
    this._isMy = isMy;
    this._popupClose = popupClose;
    this._id = id;
    this._deleteCard = deleteCard;
    this._unlike = unlike;
    this._likeCard = likeCard;
    this._popupCloseWithoutCheck = popupCloseWithoutCheck;
  }

  _createCard() {
    this._cardTemplate.querySelector(
      ".elements__title"
    ).textContent = this._text;
    this._cardTemplate.querySelector(
      ".elements__like-counter"
    ).textContent = this._likesCounter;
    this._cardImage = this._cardTemplate.querySelector(".elements__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._renderCard(this._link, this._text);
  }

  _like() {
    if (!this._likeButton.classList.contains("elements__like_active")) {
      this._likeCard(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this._likeButton.classList.toggle("elements__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._unlike(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this._likeButton.classList.toggle("elements__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _delete() {
    this._popupClose
      .querySelector(".popup__submit-button-close")
      .removeEventListener("click", this._removeCardBind);
    this._openPopup();
    this._removeCardBind = this._removeCard.bind(this);
    this._popupClose
      .querySelector(".popup__submit-button-close")
      .addEventListener("click", this._removeCardBind);
  }

  _removeCard() {
    this._popupCloseWithoutCheck();
    this._deleteCard(this._id)
      .then(() => {
        this._deleteButton.closest(".elements__element").remove();
      })
      .catch((err) => {
        console.log(err);
      });
    this._popupClose
      .querySelector(".popup__submit-button-close")
      .removeEventListener("click", this._removeCardBind);
  }

  _renderCard(link, text) {
    this._likeBind = this._like.bind(this);
    this._deleteBind = this._delete.bind(this);
    this._likeButton.addEventListener("click", this._likeBind);
    this._cardImage.addEventListener("click", () => {
      this._popupWithImage.open(link, text);
    });
    if (this._isMy) {
      this._deleteButton.addEventListener("click", this._deleteBind);
    } else {
      this._deleteButton.style.display = "none";
    }
  }
  getTemplate() {
    this._createCard();
    return this._cardTemplate;
  }
}
