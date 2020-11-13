const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popup = page.querySelector('#popup-person');
const popupCard = page.querySelector('#popup-card');
const editButton = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubitle = profile.querySelector('.profile__subtitle');
const popupFieldName = popup.querySelector('.popup__field_type_name');
const popupFieldDescription = popup.querySelector('.popup__field_type_description');
const popupContainer = popup.querySelector('.popup__container');
const elements = page.querySelector('.elements');
const profileAddButton = profile.querySelector('.profile__add-button');
const popupCardContainer = popupCard.querySelector('.popup__container');
const popupCardFieldTile = popupCard.querySelector('.popup__field_type_name');
const popupCardFieldLink = popupCard.querySelector('.popup__field_type_description');
const popupImage = page.querySelector('#popup-image');
const imageInPopup = popupImage.querySelector('.popup__image');
const popupImageTitle= popupImage.querySelector('.popup__image-title');
const formList = Array.from(document.querySelectorAll('.popup'));
const popupPersonFields = Array.from(popupContainer.querySelectorAll('.popup__field'));
const PopupCardFields = Array.from(popupCardContainer.querySelectorAll('.popup__field'));
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {FormValidator, checkFieldsValid} from '../components/validation.js';
  // formList.forEach((formElement) => {
  //   formElement.addEventListener('click', closePopup);
  // });
const popupPerson = new PopupWithForm('popupPerson', () => {
  profileTitle.textContent = popupFieldName.value;
  profileSubitle.textContent = popupFieldDescription.value;
});
const popupAddCard = new PopupWithForm('popupAddCard', () => {
    //evt.preventDefault();
    const cardElement = new Card(popupCardFieldTile.value, popupCardFieldLink.value, '#cards', popupWithImage);
    elements.prepend(cardElement.getTemplate());
    popupFieldName.value = profileTitle.textContent;
    popupFieldDescription.value = profileSubitle.textContent;
});
const popupWithImage = new PopupWithImage('popupImage', {popupImage, imageInPopup, popupImageTitle});

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

const section = new Section({
  items: initialCards, 
  renderer: (item) => {
  const cardElement = new Card(item.name, item.link, '#cards', popupWithImage);
  return (cardElement.getTemplate());
}}, '.elements');
section.renderItems();

// function openPopup(popup) {
//   document.addEventListener('keydown', closePopup);
//   popup.classList.add('popup_opened');
//   if (popup.id == 'popup-person')
//   console.log(1);
// }
// function closePopup(evt) {
//   if (evt.key == 'Escape' || evt.type == 'submit' || evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-image")) {
//     page.querySelector('.popup_opened').classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopup);
//     console.log(true);
//   }
// }

// function formSubmitHandler(evt) {
//   if (checkFieldsValid(popupPersonFields)) {
//     evt.preventDefault();
//     profileTitle.textContent = popupFieldName.value;
//     profileSubitle.textContent = popupFieldDescription.value;
//     closePopup(evt);
//   }
// }



// function formCardSubmitHandler(evt) {
//   if (checkFieldsValid(PopupCardFields)) {
//     evt.preventDefault();
//     const cardElement = new Card(popupCardFieldTile.value, popupCardFieldLink.value, '#cards', popupWithImage);
//     elements.prepend(cardElement.getTemplate());
//     popupFieldName.value = profileTitle.textContent;
//     popupFieldDescription.value = profileSubitle.textContent;
//     closePopup(evt);
//   }
// }

editButton.addEventListener('click', () => {
  popupFieldName.setAttribute('value', `${profileTitle.textContent}`);
  popupFieldDescription.setAttribute('value', `${profileSubitle.textContent}`);
  popupPerson.open();
});
// popupContainer.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', () => {popupAddCard.open()});
//popupCardContainer.addEventListener('submit', formCardSubmitHandler); 
export {Popup};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSelectors, formElement);
    formValidator.enableValidation();
  });
}
enableValidation();