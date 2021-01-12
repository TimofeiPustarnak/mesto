export default class UserInfo {
  constructor (name, description) {
    this._nameElement = document.querySelector(name);
    this._descriptionElement = document.querySelector(description);
  }

  getUserInfo() {
    return {name:this._nameElement.textContent, description:this._descriptionElement.textContent};
  }

  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}