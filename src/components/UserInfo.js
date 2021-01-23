export default class UserInfo {
  constructor (name, description, avatar) {
    this._nameElement = document.querySelector(name);
    this._descriptionElement = document.querySelector(description);
    this._avatarElement = document.querySelector(avatar);
  }

  getUserInfo() {
    return {name:this._nameElement.textContent, description:this._descriptionElement.textContent};
  }

  setUserInfo(name, description, avatar) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
    this._avatarElement.src = avatar;
  }
}