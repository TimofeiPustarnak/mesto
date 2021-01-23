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
const profileAvatar = document.querySelector('.profile__avatar');
const popupClose = document.querySelector('#popup-close');
const popupSubmitButton = document.querySelector('.popup__submit-button-close');
let section;

function cardElementOpenPopup() {
  popupConfirm.open();
  popupConfirm.setEventListeners();
  popupSubmitButton.classList.remove('popup__submit-button_inactive');
}

fetch('https://mesto.nomoreparties.co/v1/cohort-19/users/me ', {
  headers: {
    authorization: 'e7c816a7-6326-4823-aa23-7ff97d0294f3'
  }
}).then(res =>
  res.json())
.then(data => {
  userInfo.setUserInfo(data.name, data.about);
  profileAvatar.src = data.avatar;
});

fetch('https://mesto.nomoreparties.co/v1/cohort-19/cards', {
  headers: {
    authorization: 'e7c816a7-6326-4823-aa23-7ff97d0294f3'
  }
}).then(res => res.json())
.then(data => {
  section = new Section({
    items: data, 
    renderer: (item) => {
    let bool =  item.owner.name == userInfo.getUserInfo().name;
    const cardElement = new Card(item.name, item.link, '#cards', popupWithImage, item.likes.length, cardElementOpenPopup, bool, popupClose, item._id);
    return (cardElement.getTemplate());
  }}, '.elements');
  section.renderItems();
});
const validationSelectors =
{
  fieldClass: '.popup__field',
  buttonClass: '.popup__submit-button', 
  buttonInactiveClass: 'popup__submit-button_inactive', 
  errorClass: 'popup__field_type_error'
}
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirm from '../components/PopupConfirm.js'; 

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupConfirm = new PopupConfirm('popupConfirm');

const popupPerson = new PopupWithForm('popupPerson', () => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-19/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'e7c816a7-6326-4823-aa23-7ff97d0294f3',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: popupFieldName.value,
    about: popupFieldDescription.value
  })
}); 
  userInfo.setUserInfo(popupFieldName.value, popupFieldDescription.value);
});
popupPerson.setEventListeners();
const popupAddCard = new PopupWithForm('popupAddCard', () => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-19/cards', {
    method: 'POST',
    headers: {
      authorization: 'e7c816a7-6326-4823-aa23-7ff97d0294f3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: popupCardFieldTile.value,
      link: popupCardFieldLink.value
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.name);
    const cardElement = new Card(data.name, data.link, '#cards', popupWithImage, 0, cardElementOpenPopup, true, popupClose, data._id);
    section.addItem(cardElement.getTemplate());
  })
});
popupAddCard.setEventListeners();
const popupWithImage = new PopupWithImage('popupImage', {popupImage, imageInPopup, popupImageTitle});
popupWithImage.setEventListeners();


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