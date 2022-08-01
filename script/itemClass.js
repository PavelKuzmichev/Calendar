class Item {
  constructor(heading, title) {
      this._title = title;
      this._heading = heading;
  }

  _getTemplate() {
      const itemElement = document.querySelector(".itemSearch-template").content.querySelector(".itemSearch").cloneNode(true);
      return itemElement;
  }

  generateItem() {
      this._element = this._getTemplate();

      this._element.querySelector(".itemSearch__heading").textContent = this._heading;
      this._element.querySelector(".itemSearch__title").textContent = this._title;

      return this._element;
  }
}
