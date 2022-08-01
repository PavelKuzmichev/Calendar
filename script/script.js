//кнопки вперед/назад по календарю
const buttonBack = document.querySelector(".nav__button_back");
const buttonForward = document.querySelector(".nav__button_forward");
//кнопка "Добавить в сокращенном варианте"
const headerButtonAdd = document.querySelector(".header__button_add");
//кнопка 'сегодня'
const navButtonToday = document.querySelector(".nav__button_today");
//контейнер для карточек-дней
const dayCardsArea = document.querySelector(".day-cards");
//все карточки
const allDayCards = document.querySelectorAll(".day-card");
//место для информации какой месяц выставлен
const navMonth = document.querySelector(".nav__month");
//окно поиска в шапке сайта
const headerSearchInput = document.querySelector(".header__search_input");
//попапы, создание через классы
const openPopupAddNewTask = new PopupWithForm(".popup__add", sumbitFormAdd);
const openPopupSearch = new PopupSearch(".popup__search");
const openPopupAddNewTaskQuick = new PopupWithFormQuick(".popup__quick", sumbitFormQuick);
const openPopupOverView = new PopupWithFormOverView(".popup__overview", submitFormOverView);
//глобальные переменные
//текущая карточка
let currentCard = null;
//сегодня
let day = new Date();
//последний день текущего месяца
let lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0);

//слушатели
navButtonToday.addEventListener("click", showCardsTodayMonth); //вспомогательные строка 38
buttonBack.addEventListener("click", () => {
    createCards("back");
});
buttonForward.addEventListener("click", () => {
    createCards("forward");
});
headerSearchInput.addEventListener("focus", () => {
    openPopupSearch.open();
});
headerButtonAdd.addEventListener("click", () => {
    openPopupAddNewTaskQuick.open();
    headerButtonAdd.classList.add("header__button_active");
});
//функция создания множества карточек при движении по календарю и стартовое состояние
function createCards(direction) {
    resetCards();
    showCurrentMonth(direction);

    for (let i = 0; i < 35; i++) {
        let currentDate = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() - i);
        const heading = i >= 28 ? `${dayofWeekConversion(currentDate.getDay())},${currentDate.getDate()}` : currentDate.getDate();
        const cardElement = createOneDayCard(heading);
        dayCardsArea.prepend(cardElement);
    }
}

//навешиваем слушатели на попапы
openPopupAddNewTask.setEventListeners();
openPopupAddNewTaskQuick.setEventListeners();
openPopupOverView.setEventListeners();
openPopupSearch.setEventListeners();
//первоначальный рендер
createCards();



