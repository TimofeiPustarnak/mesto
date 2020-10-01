const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popup = page.querySelector('#popup-person');
const popupCard = page.querySelector('#popup-card');
const editButton = profile.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubitle = profile.querySelector('.profile__subtitle');
const popupFieldName = popup.querySelector('.popup__field_type_name');
const popupFieldDescription = popup.querySelector('.popup__field_type_description');
const popupContainer = popup.querySelector('.popup__container');
const elements = page.querySelector('.elements');
const profileAddButton = profile.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');
const popupCardContainer = popupCard.querySelector('.popup__container');
const cardsTemplate = elements.querySelector('#cards').content;
const popupCardFieldTile = popupCard.querySelector('.popup__field_type_name');
const popupCardFieldLink = popupCard.querySelector('.popup__field_type_description');
const popupImage = page.querySelector('#popup-image');
const imageInPopup = popupImage.querySelector('.popup__image');
const popupImageTitle= popupImage.querySelector('.popup__image-title');
const popupCloseButton= popupImage.querySelector('.popup__close-button');
const formList = Array.from(document.querySelectorAll('.popup'));
const popupPersonFields = Array.from(popupContainer.querySelectorAll('.popup__field'));
const PopupCardFields = Array.from(popupCardContainer.querySelectorAll('.popup__field'));
  formList.forEach((formElement) => {
    formElement.addEventListener('click', function (evt) {
        if (evt.target.id == 'popup-card') {
          closePopupCard();
        }
        if (evt.target.id == 'popup-person') {
          closePopup();
        }
        if (evt.target.id == 'popup-image') {
          closePopupImage();
        }
  });
});
popupFieldName.setAttribute('value', `${profileTitle.textContent}`);
popupFieldDescription.setAttribute('value', `${profileSubitle.textContent}`);

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderCards() {
  initialCards.reverse().forEach((card, i) => {
    createCard (initialCards[i].name, initialCards[i].link, true);
  });
}
function createCard (text, link) {
  const cardTemplate = cardsTemplate.cloneNode(true);
    cardTemplate.querySelector('.elements__title').textContent = text;
    const cardImage = cardTemplate.querySelector('.elements__image');
    cardImage.src = link;
    cardImage.alt = text;
      renderCard(link, text, cardTemplate, cardImage);
}
function renderCard (link, text, cardTemplate, cardImage) {
    cardTemplate.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
    });
    cardTemplate.querySelector('.elements__delete').addEventListener('click', function (evt) {
      const card = evt.target.closest('.elements__element');
      card.remove();
    });

    cardImage.addEventListener('click', function () {
      popupImage.classList.add('popup_opened');
      imageInPopup.src = link;
      imageInPopup.alt = text;
      popupImageTitle.textContent = text;
      popupCloseButton.addEventListener('click', function () {
      closePopupImage();
      });
    });
    elements.prepend(cardTemplate); 
}
function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popupFieldName.value = profileTitle.textContent;
  popupFieldDescription.value = profileSubitle.textContent;
}

function formSubmitHandler(evt) {
  if (checkFieldsValid(popupPersonFields)) {
    evt.preventDefault();
    profileTitle.textContent = popupFieldName.value;
    profileSubitle.textContent = popupFieldDescription.value;
    closePopup();
  }
}
function closePopupCard() {
  popupCard.classList.remove('popup_opened');
}

function formCardSubmitHandler(evt) {
  if (checkFieldsValid(PopupCardFields)) {
    evt.preventDefault();
    createCard(popupCardFieldTile.value, popupCardFieldLink.value, false)
    popupCardFieldTile.value = '';
    popupCardFieldLink.value = '';
    closePopupCard();
  }
}

editButton.addEventListener('click', () => openPopup(popup));
closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCardCloseButton.addEventListener('click', closePopupCard);
popupCardContainer.addEventListener('submit', formCardSubmitHandler);
document.addEventListener('keydown', function (evt) {
  if (evt.key == 'Escape' && page.querySelector('.popup_opened') !== null) {
    if (page.querySelector('.popup_opened').id == 'popup-card') {
      closePopupCard();
      return;
    }
    if (page.querySelector('.popup_opened').id == 'popup-person') {
      closePopup();
      return;
    }
    if (page.querySelector('.popup_opened').id == 'popup-image') {
      closePopupImage();
      return;
    }
  }
}); 
renderCards();