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

const PICTURE_DESCTIPTIONS = [
  'Данную фотографию я очень люблю.',
  'Эта фотография вызывает у меня тёплые чувства',
  'Всем моим братьям салам',
  `Номера тачек, хата на девятом, знай кто платит (Rrrra)
  Street credibility и не надо платин, (Ski,ski)`
];

const commentIds = [];

const PHOTOS_SIZE = 25;
const MAX_STRING_LENGTH = 140;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 5;
const MIN_AVATAR_VALUE = 1;
const MAX_AVATAR_VALUE = 6;


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


const getPictureUrl = function (i) {
  return `photos/${i}.jpg`;
};


const getCommentId = function () {
  const randomId = getRandomPositiveInteger(0, 1000);
  if (commentIds.includes(randomId)) {
    getCommentId();
  }
  commentIds.push(randomId);
  return randomId;
};


const getCommentAvatar = function (begin, end) {
  return `img/avatar-${getRandomPositiveInteger(begin, end)}.svg`;
};


const getCommentMessage = function (){
  const commentMessage = getRandomFromArray(COMMENT_MESSAGES);
  return checkStringLength(commentMessage, MAX_STRING_LENGTH) ? commentMessage : undefined;
};


const createComment = function (){
  const comment = {
    id: getCommentId(),
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
    description: getRandomFromArray(PICTURE_DESCTIPTIONS),
    likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS) }, createComment),
  };
  return photo;
};

const returnArray = function(array){
  return array;
};


getRandomPositiveInteger(1, 5);
checkStringLength('Hello my name is...', MAX_STRING_LENGTH);
const photos = Array.from({length : PHOTOS_SIZE}, createPhoto);
returnArray(photos);
