const getRandomPositiveInteger = function (begin, end) {
  [begin, end] = [Math.min(begin, end), Math.max(begin, end)];
  return begin + Math.floor(Math.random() * (end - begin + 1));
};


const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};


const getRandomElementFromArray = function (array) {
  const randomIndex = getRandomPositiveInteger(0, array.length - 1);
  return array[randomIndex];
};


const countValueInArray = function (array, value) {
  let count = 0;
  array.forEach((element) => {
    count += element === value ? 1 : 0;
  });
  return count;
};


const appendElementsToList = function (elements, elementsList, createListItem) {
  const listItemsFragment = document.createDocumentFragment();
  elements.forEach((element) => {
    const listItem = createListItem(element);
    listItemsFragment.append(listItem);
  });
  elementsList.append(listItemsFragment);
};


const appendNElementsToList = function (elements, elementsList, createListItem, step) {
  let elementsBegin = 0;
  let elementsEnd = Math.min(elements.length, step);
  return function () {
    if (elementsBegin < elements.length) {
      const elementsPart = elements.slice(elementsBegin, elementsEnd);
      elementsBegin += step;
      elementsEnd += step;
      appendElementsToList(elementsPart, elementsList, createListItem);
    }

  };
};


const isEscapeKey = function (evt) {
  return evt.key === 'Escape';
};


const transformScaleElement = function (element, value) {
  element.style.transform = `scale(${value})`;
};


const changeElementClass = function (element, previousClass, newClass) {
  if (previousClass !== newClass) {
    element.classList.remove(previousClass);
    element.classList.add(newClass);
  }
};


const showErrorMessage = function (message, duration) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '8px 2px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, duration);
};


const changeCheckedItem = function(prevChecked, newChecked){
  prevChecked.checked = false;
  newChecked.checked = true;
};


export {
  getRandomElementFromArray, getRandomPositiveInteger,
  checkStringLength, appendElementsToList, countValueInArray,
  isEscapeKey, appendNElementsToList, transformScaleElement,
  changeElementClass, showErrorMessage, changeCheckedItem,
};
