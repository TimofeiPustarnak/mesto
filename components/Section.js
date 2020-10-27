class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }
  
} 