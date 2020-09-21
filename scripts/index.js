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
    createCard (initialCards[i].name, initialCards[i].link, true);
  });
}
function createCard (textContent1, link1, append) {
  const cardTemplate = cardsTemplate.cloneNode(true);
    cardTemplate.querySelector('.elements__title').textContent = textContent1;
    const cardImage = cardTemplate.querySelector('.elements__image');
    cardImage.src = link1;
    cardImage.alt = textContent1;
      renderCard(link1, textContent1, cardTemplate, cardImage, append);
}
function renderCard (link1, textContent1, cardTemplate, cardImage, append) {
    cardTemplate.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
    });
    cardTemplate.querySelector('.elements__delete').addEventListener('click', function (evt) {
      const card = evt.target.closest('.elements__element');
      card.remove();
    });

    cardImage.addEventListener('click', function () {
      popupImage.classList.add('popup_opened');
      imageInPopup.src = link1;
      imageInPopup.alt = textContent1;
      popupImageTitle.textContent = textContent1;
      popupCloseButton.addEventListener('click', function () {
      popupImage.classList.remove('popup_opened');
      });
    });
    append ? elements.append(cardTemplate) : elements.prepend(cardTemplate); 
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
  createCard(popupCardFieldTile.value, popupCardFieldLink.value, false)
  popupCardFieldTile.value = '';
  popupCardFieldLink.value = '';
  closePopupCard();
}

editButton.addEventListener('click', () => openPopup(popup));
closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCardCloseButton.addEventListener('click', closePopupCard);
popupCardContainer.addEventListener('submit', formCardSubmitHandler)

renderCards(); 