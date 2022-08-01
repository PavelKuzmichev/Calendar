//обработка сабмита Формы добавления новой задачи
function sumbitFormAdd(result) {
  const day = +result.data ? +result.data : result.data.split(",")[1];
  const month = !+result.data && day > 24 ? lastDay.getMonth() - 1 : lastDay.getMonth();

  const id = new Date(lastDay.getFullYear(), month, day);

  result.forSearch = rusForSearch(month);

  localStorage.setItem(id, JSON.stringify(result));

  const cardElement = createOneDayCard(result.data, result.title, result.people, result.description);
  dayCardsArea.insertBefore(cardElement, currentCard.nextElementSibling);

  openPopupAddNewTask.close();

  currentCard.remove();
  return;
}
//обработка сабмита быстрого добавления задачи
function sumbitFormQuick(value) {
  let element = dayCardsArea.firstChild;
  currentCard = null;
  search(element, value);
if(!currentCard) {
  event.target.querySelector('.popup__input').value = 'некорректное значение'
  return}
  const id = new Date(lastDay.getFullYear(), lastDay.getMonth(), +value.quick.split(",")[0]);

  const result = {
      title: value.quick.split(", ")[1],
      data: value.quick.split(", ")[0],
      people: value.quick.split(", ")[2],
      forSearch: rusForSearch(lastDay.getMonth()),
      description: "",
  };

  localStorage.setItem(id, JSON.stringify(result));

  const cardElement = createOneDayCard(currentCard.querySelector(".day-card__heading").textContent, value.quick.split(",")[1], value.quick.split(",")[2], value.quick.split(",")[3]);
  dayCardsArea.insertBefore(cardElement, currentCard.nextElementSibling);
  openPopupAddNewTaskQuick.close();
  currentCard.remove();
  return;
}
//обработка сабмита формы с редактированием и удалением задачи
function submitFormOverView(result) {
  const cardElement = createOneDayCard(
      currentCard.querySelector(".day-card__heading").textContent,
      currentCard.querySelector(".day-card__title").textContent,
      currentCard.querySelector(".day-card__people").textContent,
      result.description
  );
  
  const day = +currentCard.querySelector(".day-card__heading").textContent ? +currentCard.querySelector(".day-card__heading").textContent : currentCard.querySelector(".day-card__heading").textContent.split(",")[1];

  const month = !+currentCard.querySelector(".day-card__heading").textContent && day > 24 ? lastDay.getMonth() - 1 : lastDay.getMonth();
  
  const id = new Date(lastDay.getFullYear(), month, day);

  const element = JSON.parse(localStorage.getItem(id));

  element.description = result.description;
  localStorage.setItem(id, JSON.stringify(element));

  dayCardsArea.insertBefore(cardElement, currentCard.nextElementSibling);
  openPopupOverView.close();
  currentCard.remove();
  return;
}
