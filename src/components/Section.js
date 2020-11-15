export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.reverse().forEach(element => {
      this.addItem(element);
    });
  }
  addItem(element) {
    this._element.prepend(this._renderer(element));
  }
} 