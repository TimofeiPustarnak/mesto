// import './pages/index.css';
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popup = page.querySelector('#popup-person');
const popupCard = page.querySelector('#popup-card');
const editButton = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubitle = profile.querySelector('.profile__subtitle');
const popupFieldName = popup.querySelector('.popup__field_type_name');
const popupFieldDescription = popup.querySelector('.popup__field_type_description');
const elements = page.querySelector('.elements');
const profileAddButton = profile.querySelector('.profile__add-button');
const popupCardFieldTile = popupCard.querySelector('.popup__field_type_name');
const popupCardFieldLink = popupCard.querySelector('.popup__field_type_description');
const popupImage = page.querySelector('#popup-image');
const imageInPopup = popupImage.querySelector('.popup__image');
const popupImageTitle= popupImage.querySelector('.popup__image-title');
import Card from './components/Card.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import {FormValidator} from './components/validation.js';

const popupPerson = new PopupWithForm('popupPerson', () => {
  profileTitle.textContent = popupFieldName.value;
  profileSubitle.textContent = popupFieldDescription.value;
});
const popupAddCard = new PopupWithForm('popupAddCard', () => {
    const cardElement = new Card(popupCardFieldTile.value, popupCardFieldLink.value, '#cards', popupWithImage);
    cardElement.like();
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

editButton.addEventListener('click', () => {
  popupPerson.open();
  popupFieldName.setAttribute('value', profileTitle.textContent);
  popupFieldDescription.setAttribute('value', profileSubitle.textContent);
});
profileAddButton.addEventListener('click', () => {popupAddCard.open()});
export {Popup};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSelectors, formElement);
    formValidator.enableValidation();
  });
}
enableValidation();