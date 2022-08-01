//Общий класс поппап
class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeByClick = this._closeByClick.bind(this);
        this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
    }

    open() {
        this._popup.classList.add("popup__visible");
        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener("click", this._closeByClick);
    }

    close() {
        this._popup.classList.remove("popup__visible");
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("click", this._closeByClick);
    }

    _closeByClick(e) {
        if (e.target.classList.contains("popup__visible")) {
            this.close();
        }
    }

    _handleEscClose(e) {
        if (e.key === "Escape" && document.querySelector(".popup__visible")) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupCloseBtn.addEventListener("click", () => this.close());
    }
}
//расширинение для попапап с добавление нвовой задачи
class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll(".popup__input");
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
        return this._formValues;
    }
    _reset() {
        this._popupForm.reset();
        this._popupForm.querySelector(".popup__input_form_data").value = currentCard.querySelector(".day-card__heading").textContent;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (event) => {
            event.preventDefault();
            this._submitForm(this._getInputValues());
        });
        this._popup.querySelector(".popup__form_btn_reset").addEventListener("click", () => this._reset());
    }
    open() {
        super.open();
        this._popupForm.querySelector(".popup__input_form_data").value = currentCard.querySelector(".day-card__heading").textContent;
        currentCard.classList.add("day-card_active");
    }
    close() {
        super.close();
        currentCard.classList.remove("day-card_active");
        setTimeout(() => this._popupForm.reset(), 500);
    }
}
//рассширение для попапа быстрого добавления задачи
class PopupWithFormQuick extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll(".popup__input");
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (event) => {
            event.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        headerButtonAdd.classList.remove("header__button_active");
        setTimeout(() => this._popupForm.reset(), 500);
    }
}
//расширение для попапа с просмотром уже созданной задачи
class PopupWithFormOverView extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll(".popup__input");
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
        return this._formValues;
    }
    _reset() {
        const day = +currentCard.querySelector(".day-card__heading").textContent ? +currentCard.querySelector(".day-card__heading").textContent : currentCard.querySelector(".day-card__heading").textContent.split(",")[1];
        let month = lastDay.getMonth();
        if (day >= 25 && day != +currentCard.querySelector(".day-card__heading").textContent) {
            month = lastDay.getMonth() - 1;
        }
   
        const id = new Date(lastDay.getFullYear(), month, day);

        localStorage.removeItem(id);
        let heading = currentCard.querySelector(".day-card__heading").textContent;

        this._popupForm.reset();
        const cardElement = createOneDayCard(heading, "", "", "");
        dayCardsArea.insertBefore(cardElement, currentCard.nextElementSibling);
        openPopupOverView.close();
        currentCard.remove();

        return;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(".popup__form_btn_reset").addEventListener("click", () => this._reset());
        this._popup.addEventListener("submit", (event) => {
            event.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }
    _afterOpen() {
        currentCard.classList.add("day-card_active");
        this._popupForm.querySelector(".popup__overview_title").textContent = currentCard.querySelector(".day-card__title").textContent;
        this._popupForm.querySelector(".popup__overview_date").textContent = currentCard.querySelector(".day-card__heading").textContent;
        this._popupForm.querySelector(".popup__overview_people").textContent = currentCard.querySelector(".day-card__people").textContent;
        this._popupForm.querySelector(".popup__input_form_textarea_overview").value = currentCard.querySelector(".day-card__description").textContent;
    }
    open() {
        super.open();
        this._afterOpen();
    }
    close() {
        super.close();
        currentCard.classList.remove("day-card_active");
        setTimeout(() => this._popupForm.reset(), 500);
    }
}

class PopupSearch extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupWindow = this._popup.querySelector(".popup__window_search");
    }
    _getData() {
        while (this._popupWindow.firstChild) {
            this._popupWindow.firstChild.remove();
        }

        for (let key in localStorage) {
            const element = JSON.parse(localStorage.getItem(key));
            if (!element) {
                return;
            }

            const dayOfMonth = +element.data ? +element.data : +element.data.split(",")[1];
            const itemSearch = new Item(element.title, `${dayOfMonth} ${element.forSearch}`);
            this._popupWindow.prepend(itemSearch.generateItem());
        }
    }
    setEventListeners() {}
    open() {
        super.open();
        this._getData();
    }
    close() {
        super.close();
    }
}

