import {
  getRandomFromArray, getRandomPositiveInteger
  , checkStringLength
} from './util.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAMES = [
  'Антон', 'Иван', 'Мария', 'Кекс', 'Василий', 'Елена Ивановна',
];

const PICTURE_DESCRIPTIONS = [
  'Данную фотографию я очень люблю.',
  'Эта фотография вызывает у меня тёплые чувства',
  'Всем моим братьям салам',
  `Номера тачек, хата на девятом, знай кто платит (Rrrra)
  Street credibility и не надо платин, (Ski,ski)`
];

const PHOTOS_SIZE = 25;
const MAX_STRING_LENGTH = 140;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 5;
const MIN_AVATAR_VALUE = 1;
const MAX_AVATAR_VALUE = 6;
const MIN_COMMENT_ID = 0;
const MAX_COMMENT_ID = 1000;


const getPictureUrl = function (i) {
  return `photos/${i}.jpg`;
};


const createRandomIdFromRangeGenerator = function (min, max) {
  const previousValues = [];
  return function(){
    if(previousValues.length === max - min + 1){
      return null;
    }
    let randomId = getRandomPositiveInteger(min, max);
    while(previousValues.includes(randomId)){
      randomId = getRandomPositiveInteger(min, max);
    }
    previousValues.push(randomId);
    return randomId;
  };
};


const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);


const getCommentAvatar = function (begin, end) {
  return `img/avatar-${getRandomPositiveInteger(begin, end)}.svg`;
};


const getCommentMessage = function () {
  const commentMessage = getRandomFromArray(COMMENT_MESSAGES);
  return checkStringLength(commentMessage, MAX_STRING_LENGTH) ? commentMessage : undefined;
};


const createComment = function () {
  const comment = {
    id: generateCommentId(),
    avatar: getCommentAvatar(MIN_AVATAR_VALUE, MAX_AVATAR_VALUE),
    message: getCommentMessage(),
    name: getRandomFromArray(COMMENT_NAMES),
  };
  return comment;
};


const createPhoto = function (element, index) {
  const photo = {
    id: index + 1,
    url: getPictureUrl(index + 1),
    description: getRandomFromArray(PICTURE_DESCRIPTIONS),
    likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS) }, createComment),
  };
  return photo;
};


export { MAX_STRING_LENGTH, PHOTOS_SIZE, createPhoto };
