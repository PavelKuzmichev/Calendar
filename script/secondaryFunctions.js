function dayofWeekConversion(number) {
  return number === 0 ? "Воскресенье" : number === 6 ? "Суббота" : number === 5 ? "Пятница" : number === 4 ? "Четверг" : number === 3 ? "Среда" : number === 2 ? "Вторник" : "Понедельник";
}
function monthConversion(number) {
  return number === 12
      ? "Декабрь"
      : number === 11
      ? "Ноябрь"
      : number === 10
      ? "Октябрь"
      : number === 9
      ? "Сентябрь"
      : number === 8
      ? "Август"
      : number === 7
      ? "Июль"
      : number === 6
      ? "Июнь"
      : number === 5
      ? "Май"
      : number === 4
      ? "Апрель"
      : number === 3
      ? "Март"
      : number === 2
      ? "Февраль"
      : "Январь";
}
function showCurrentMonth(direction) {
  const value = direction === "forward" ? 1 : direction === "back" ? -1 : 0;
  lastDay = new Date(new Date(lastDay.getFullYear(), lastDay.getMonth() + 1 + value, 0));
  navMonth.textContent = `${monthConversion(lastDay.getMonth() + 1)}, ${lastDay.getFullYear()}`;
}
function resetCards() {
  while (dayCardsArea.firstChild) {
      dayCardsArea.removeChild(dayCardsArea.firstChild);
  }
}
function showCardsTodayMonth() {
  lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0);
  createCards(0);
}
function createOneDayCard(heading, title, people, description) {
  const dayCard = new Card(heading, title, people, description);
  return dayCard.generateCard();
}
function search(element, result) {
  if (!element) {
      return;
  }
  const date = element.querySelector(".day-card__heading").textContent;
  if(element.querySelector(".day-card__heading").textContent === result.quick.split(",")[0] || (date.split(",")[1] === result.quick.split(",")[0] && +date.split(",")[1] < 4)) {
    currentCard = element
    return
  } 
  search(element.nextElementSibling, result);
}
function rusForSearch(month) {
  const realMonth = month + 1;

  switch (realMonth) {
      case 1:
          return "января";

      case 2:
          return "февраля";

      case 3:
          return "марта";

      case 4:
          return "апреля";

      case 5:
          return "мая";

      case 6:
          return "июня";

      case 7:
          return "июля";

      case 8:
          return "августа";

      case 9:
          return "сентября";

      case 10:
          return "октября";

      case 11:
          return "ноября";

      case 0:
          return "декабря";
  }
}
