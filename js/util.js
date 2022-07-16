const getRandomPositiveInteger = function (begin, end) {
  [begin, end] = [Math.min(begin, end), Math.max(begin, end)];
  return begin + Math.floor(Math.random() * (end - begin + 1));
};


const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};


const getRandomFromArray = function (array) {
  const randomIndex = getRandomPositiveInteger(0, array.length - 1);
  return array[randomIndex];
};


const returnArray = function (array) {
  return array;
};


export {
  getRandomFromArray, getRandomPositiveInteger
  , checkStringLength, returnArray
};
