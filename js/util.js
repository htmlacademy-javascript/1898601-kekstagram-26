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


export {
  getRandomElementFromArray, getRandomPositiveInteger
  , checkStringLength, appendElementsToList, countValueInArray,
  isEscapeKey, appendNElementsToList,
};
