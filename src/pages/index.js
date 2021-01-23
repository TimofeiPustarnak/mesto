// import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const popup = page.querySelector("#popup-person");
const popupCard = page.querySelector("#popup-card");
const editButton = profile.querySelector(".profile__edit-button");
const popupFieldName = popup.querySelector(".popup__field_type_name");
const popupFieldDescription = popup.querySelector(
  ".popup__field_type_description"
);
const profileAddButton = profile.querySelector(".profile__add-button");
const popupCardFieldTile = popupCard.querySelector(".popup__field_type_name");
const popupCardFieldLink = popupCard.querySelector(
  ".popup__field_type_description"
);
const popupEditFieldLink = document.querySelector("#link-input-edit");
const popupImage = page.querySelector("#popup-image");
const imageInPopup = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-title");
const popupClose = document.querySelector("#popup-close");
const popupSubmitButton = document.querySelector(".popup__submit-button-close");
const avatar = document.querySelector(".profile__avatar");
let section;
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "e7c816a7-6326-4823-aa23-7ff97d0294f3",
    "Content-Type": "application/json",
  },
});
function cardElementOpenPopup() {
  popupConfirm.open();
  popupSubmitButton.classList.remove("popup__submit-button_inactive");
}

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((data) => {
    userInfo.setUserInfo(data[1].name, data[1].about, data[1].avatar);
    section = new Section(
      {
        items: data[0],
        renderer: (item) => {
          let bool = item.owner.name == userInfo.getUserInfo().name;
          const cardElement = new Card(
            item.name,
            item.link,
            "#cards",
            popupWithImage,
            item.likes.length,
            cardElementOpenPopup,
            bool,
            popupClose,
            item._id,
            api.like,
            api.unLike,
            api.deleteCard,
            "https://mesto.nomoreparties.co/v1/cohort-19",
            "e7c816a7-6326-4823-aa23-7ff97d0294f3"
          );
          return cardElement.getTemplate();
        },
      },
      ".elements"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const validationSelectors = {
  fieldClass: ".popup__field",
  buttonClass: ".popup__submit-button",
  buttonInactiveClass: "popup__submit-button_inactive",
  errorClass: "popup__field_type_error",
};

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

const popupConfirm = new PopupWithForm(
  "popupConfirm",
  () => {},
  "popup-confirm-button"
);
popupConfirm.setEventListeners();

const popupPerson = new PopupWithForm(
  "popupPerson",
  () => {
    api
      .patchUserInfo(popupFieldName.value, popupFieldDescription.value)
      .then((data) => {
        popupPerson.closeWithoutCheck();
        userInfo.setUserInfo(data.name, data.about, data.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupPerson.buttonLoadingReset();
      });
  },
  "popup-person-submit-button"
);
popupPerson.setEventListeners();
const popupEditAvatar = new PopupWithForm(
  "popupEditAvatar",
  () => {
    api
      .editAvatar(popupEditFieldLink.value)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        popupEditAvatar.closeWithoutCheck();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.buttonLoadingReset();
      });
  },
  "popup-edit-avatar-button"
);

popupEditAvatar.setEventListeners();

const popupAddCard = new PopupWithForm(
  "popupAddCard",
  () => {
    api
      .addCard(popupCardFieldTile.value, popupCardFieldLink.value)
      .then((data) => {
        const cardElement = new Card(
          data.name,
          data.link,
          "#cards",
          popupWithImage,
          0,
          cardElementOpenPopup,
          true,
          popupClose,
          data._id,
          api.like,
          api.unLike,
          api.deleteCard,
          "https://mesto.nomoreparties.co/v1/cohort-19",
          "e7c816a7-6326-4823-aa23-7ff97d0294f3"
        );
        // так если мы будем создавать cardElement в функции, в нее же все равно придется передать все эти параметры
        section.addItem(cardElement.getTemplate());
        popupAddCard.closeWithoutCheck();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.buttonLoadingReset();
      });
  },
  "popup-addCard-button"
);
popupAddCard.setEventListeners();
const popupWithImage = new PopupWithImage("popupImage", {
  popupImage,
  imageInPopup,
  popupImageTitle,
});
popupWithImage.setEventListeners();

editButton.addEventListener("click", function () {
  popupPerson.open();
  popupFieldName.value = userInfo.getUserInfo().name;
  popupFieldDescription.value = userInfo.getUserInfo().description;
});
profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
});
avatar.addEventListener("click", () => {
  popupEditAvatar.open();
});
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSelectors, formElement);
    formValidator.enableValidation();
  });
}
function createCardElement() {}
enableValidation();
