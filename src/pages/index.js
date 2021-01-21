// import './index.css'; 
const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popup = page.querySelector('#popup-person');
const popupCard = page.querySelector('#popup-card');
const editButton = profile.querySelector('.profile__edit-button');
const popupFieldName = popup.querySelector('.popup__field_type_name');
const popupFieldDescription = popup.querySelector('.popup__field_type_description');
const profileAddButton = profile.querySelector('.profile__add-button');
const popupCardFieldTile = popupCard.querySelector('.popup__field_type_name');
const popupCardFieldLink = popupCard.querySelector('.popup__field_type_description');
const popupImage = page.querySelector('#popup-image');
const imageInPopup = popupImage.querySelector('.popup__image');
const popupImageTitle= popupImage.querySelector('.popup__image-title');
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
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
const section = new Section({
  items: initialCards, 
  renderer: (item) => {
  const cardElement = new Card(item.name, item.link, '#cards', popupWithImage);
  return (cardElement.getTemplate());
}}, '.elements');
const popupPerson = new PopupWithForm('popupPerson', () => {
  userInfo.setUserInfo(popupFieldName.value, popupFieldDescription.value);
});
popupPerson.setEventListeners();
const popupAddCard = new PopupWithForm('popupAddCard', () => {
    const cardElement = new Card(popupCardFieldTile.value, popupCardFieldLink.value, '#cards', popupWithImage);
    section.addItem(cardElement.getTemplate());
});
popupAddCard.setEventListeners();
const popupWithImage = new PopupWithImage('popupImage', {popupImage, imageInPopup, popupImageTitle});
popupWithImage.setEventListeners();

section.renderItems();

editButton.addEventListener('click', function() {
  popupPerson.open();
  popupFieldName.setAttribute('value', userInfo.getUserInfo().name);
  popupFieldDescription.setAttribute('value', userInfo.getUserInfo().description);
});
profileAddButton.addEventListener('click', () => {popupAddCard.open()});

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSelectors, formElement);
    formValidator.enableValidation();
  });
}
enableValidation();