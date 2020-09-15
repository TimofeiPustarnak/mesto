let page = document.querySelector('.page');
let profile = page.querySelector('.profile');
let popup = page.querySelector('#popup-person');
let popupCard = page.querySelector('#popup-card');
let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubitle = profile.querySelector('.profile__subtitle');
let popupFieldName = popup.querySelector('.popup__field_type_name');
let popupFieldDescription = popup.querySelector('.popup__field_type_description');
let popupContainer = popup.querySelector('.popup__container');
let elements = page.querySelector('.elements');
let profileAddButton = profile.querySelector('.profile__add-button');
let popupCardCloseButton = popupCard.querySelector('.popup__close-button');
let popupCardContainer = popupCard.querySelector('.popup__container');
const cardsTemplate = elements.querySelector('#cards').content;
let popupCardFieldTile = popupCard.querySelector('.popup__field_type_name');
let popupCardFieldLink = popupCard.querySelector('.popup__field_type_description');


popupFieldName.setAttribute('value', 'Жак-Ив Кусто');
popupFieldDescription.setAttribute('value', 'Исследователь океана');

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
  initialCards.forEach((card, i) => {
    const cardTemplate = cardsTemplate.cloneNode(true);
    cardTemplate.querySelector('.elements__title').textContent = initialCards[i].name;
    cardTemplate.querySelector('.elements__image').setAttribute('src', `${initialCards[i].link}`);
    cardTemplate.querySelector('.elements__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like_active');
    });
    elements.append(cardTemplate);
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popupFieldName.value = `${profileTitle.textContent}`;
  popupFieldDescription.value = `${profileSubitle.textContent}`;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = `${popupFieldName.value}`;
  profileSubitle.textContent = `${popupFieldDescription.value}`;
  closePopup();
}

function closePopupCard() {
  popupCard.classList.remove('popup_opened');
}

function formCardSubmitHandler(evt) {
  evt.preventDefault();
  const cardTemplate = cardsTemplate.cloneNode(true);
  cardTemplate.querySelector('.elements__title').textContent = popupCardFieldTile.value;
  cardTemplate.querySelector('.elements__image').setAttribute('src', `${popupCardFieldLink.value}`);
  console.log(popupCardFieldTile.value);
  elements.prepend(cardTemplate);
  closePopupCard();
}

editButton.addEventListener('click', () => openPopup(popup));
closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCardCloseButton.addEventListener('click', closePopupCard);
popupCardContainer.addEventListener('submit', formCardSubmitHandler)

renderCards();