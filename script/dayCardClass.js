class Card {
  constructor(heading, title, people, description) {
      this._heading = heading;
      this._title = title;
      this._people = people;
      this._description = description;
  }

  _getTemplate() {
      const cardElement = document.querySelector(".card-template").content.querySelector(".day-card").cloneNode(true);
      return cardElement;
  }
  _click(element) {
      currentCard = element;
      this._element.querySelector(".day-card__title").textContent ? openPopupOverView.open() : openPopupAddNewTask.open();
      this._element.classList.add("day-card_active");
  }

  _checkFilledState() {
      this._element.querySelector(".day-card__title").textContent ? this._element.classList.add("day-card__filled") : "";
  }

  _setListenersToItem() {
      this._element.addEventListener("click", () => this._click(this._element));
      this._element.querySelector(".day-card__heading");
  }

  generateCard() {
      const day = +this._heading ? +this._heading : this._heading.split(",")[1];
      let month = lastDay.getMonth();
      if (day >= 25 && day != +this._heading) {
          month = lastDay.getMonth() - 1;
      }

      const currentId = new Date(lastDay.getFullYear(), month, day);

      const id = JSON.parse(localStorage.getItem(currentId));

      this._element = this._getTemplate();
      this._element.querySelector(".day-card__heading").textContent = this._heading;
      this._element.querySelector(".day-card__title").textContent = this._title ? this._title : id ? id.title : "";
      this._element.querySelector(".day-card__people").textContent = this._people ? this._people : id ? id.people : "";
      this._element.querySelector(".day-card__description").textContent = this._description ? this._description : id ? id.description : "";
      this._checkFilledState();
      this._setListenersToItem();

      return this._element;
  }
}
