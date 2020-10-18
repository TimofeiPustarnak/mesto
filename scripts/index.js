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
import Card from './Card.js';
import FormValidator from './validation.js';
  formList.forEach((formElement) => {
    formElement.addEventListener('click', closePopup);
  });
popupFieldName.setAttribute('value', `${profileTitle.textContent}`);
popupFieldDescription.setAttribute('value', `${profileSubitle.textContent}`);
const validationSelectors =
{
  fieldClass: '.popup__field',
  buttonClass: '.popup__submit-button', 
  buttonInactiveClass: 'popup__submit-button_inactive', 
  errorClass: 'popup__field_type_error'
}
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
    // createCard (initialCards[i].name, initialCards[i].link);
    const cardElement = new Card(initialCards[i].name, initialCards[i].link, '#cards');
    elements.prepend(cardElement.getTemplate());
  });
}
function openPopup(popup) {
  document.addEventListener('keydown', closePopup);
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  if (evt.key == 'Escape' || evt.type == 'submit' || evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-image")) {
    page.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopup);
  }
}

function formSubmitHandler(evt) {
  if (checkFieldsValid(popupPersonFields)) {
    evt.preventDefault();
    profileTitle.textContent = popupFieldName.value;
    profileSubitle.textContent = popupFieldDescription.value;
    closePopup(evt);
  }
}

function checkFieldsValid(fieldsList) {
  return !fieldsList.some(elem => elem.validity.valid == false);
}

function formCardSubmitHandler(evt) {
  if (checkFieldsValid(PopupCardFields)) {
    evt.preventDefault();
    // createCard(popupCardFieldTile.value, popupCardFieldLink.value);
    const cardElement = new Card(popupCardFieldTile.value, popupCardFieldLink.value, '#cards');
    elements.prepend(cardElement.getTemplate());
    popupFieldName.value = profileTitle.textContent;
    popupFieldDescription.value = profileSubitle.textContent;
    closePopup(evt);
  }
}

editButton.addEventListener('click', () => openPopup(popup));
// closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', () => openPopup(popupCard));
// popupCardCloseButton.addEventListener('click', closePopup);
popupCardContainer.addEventListener('submit', formCardSubmitHandler); 
// popupCloseButton.addEventListener('click', closePopup);
renderCards();
export {openPopup, popupImage, imageInPopup, popupImageTitle};


const song = new Card('big flop', 'https://static.wikia.nocookie.net/32df47c8-2c98-45f8-b2f5-fe1517b52a9f', '#cards');
console.log(song._cardTemplate);
for (let i = 0; i < 5; ++i){
elements.prepend(song.getTemplate());}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSelectors, formElement);
    formValidator.enableValidation();
  });
}


enableValidation();
