import {
  getRandomFromArray, getRandomPositiveInteger,
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

const LIKES_SETTINGS = {
  MIN_COUNT: 15,
  MAX_COUNT: 200,
};

const COMMENT_SETTINGS = {
  MIN_COUNT: 0,
  MAX_COUNT: 5,
  MIN_ID: 0,
  MAX_ID: 1000,
};

const AVATAR_SETTINGS = {
  MIN_VALUE: 1,
  MAX_VALUE: 6,
};

const PHOTOS_SIZE = 25;
const MAX_DESCRIPTION_LENGTH = 140;


const getPictureUrl = function (i) {
  return `photos/${i}.jpg`;
};


const createRandomIdFromRangeGenerator = function (min, max) {
  const previousValues = [];
  return function () {
    if (previousValues.length === max - min + 1) {
      return null;
    }
    let randomId = getRandomPositiveInteger(min, max);
    while (previousValues.includes(randomId)) {
      randomId = getRandomPositiveInteger(min, max);
    }
    previousValues.push(randomId);
    return randomId;
  };
};


const generateCommentId = createRandomIdFromRangeGenerator(COMMENT_SETTINGS.MIN_ID, COMMENT_SETTINGS.MAX_ID);


const getCommentAvatar = function (begin, end) {
  return `img/avatar-${getRandomPositiveInteger(begin, end)}.svg`;
};


const getCommentMessage = function () {
  const commentMessage = getRandomFromArray(COMMENT_MESSAGES);
  return commentMessage;
};


const createComment = function () {
  const comment = {
    id: generateCommentId(),
    avatar: getCommentAvatar(AVATAR_SETTINGS.MIN_VALUE, AVATAR_SETTINGS.MAX_VALUE),
    message: getCommentMessage(),
    name: getRandomFromArray(COMMENT_NAMES),
  };
  return comment;
};


const createPhoto = function (index) {
  const photo = {
    id: index + 1,
    url: getPictureUrl(index + 1),
    description: getRandomFromArray(PICTURE_DESCRIPTIONS),
    likes: getRandomPositiveInteger(LIKES_SETTINGS.MIN_COUNT, LIKES_SETTINGS.MAX_COUNT),
    comments: Array.from({ length: getRandomPositiveInteger(COMMENT_SETTINGS.MIN_COUNT, COMMENT_SETTINGS.MAX_COUNT) }
      , createComment),
  };
  return photo;
};


export { MAX_DESCRIPTION_LENGTH, PHOTOS_SIZE, createPhoto };
