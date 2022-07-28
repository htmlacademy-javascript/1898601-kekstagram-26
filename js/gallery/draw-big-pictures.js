import { appendNElementsToList, isEscapeKey } from '../util.js';
const bigPictureElement = document.querySelector('.big-picture');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentsListItem = commentsList.querySelector('.social__comment');
const bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const commentInput = bigPictureElement.querySelector('.social__footer-text');

const COMMENTS_ADD_STEP = 5;


const makeCommentsListItem = function ({ avatar, name, message }) {
  const listItem = commentsListItem.cloneNode(true);
  const listItemImage = listItem.querySelector('.social__picture');
  listItemImage.src = avatar;
  listItemImage.alt = name;
  listItem.querySelector('.social__text').textContent = message;
  return listItem;
};


const drawBigPicture = function ({ url, likes, comments, description }) {
  commentsList.innerHTML = '';

  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onBigPictureEscKeyDown);

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');

  const appendCommentsToList = appendNCommentsToList();
  appendCommentsToList();
  commentsLoader.addEventListener('click', appendCommentsToList);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');


  function closeBigPicture() {
    document.body.classList.remove('modal-open');
    bigPictureElement.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onBigPictureEscKeyDown);
    commentsLoader.removeEventListener('click', appendCommentsToList);
  }


  function appendNCommentsToList() {
    const addComments = appendNElementsToList(comments, commentsList, makeCommentsListItem, COMMENTS_ADD_STEP);
    return function () {
      let commentsAmount = commentsList.children.length;
      if (commentsAmount < comments.length) {
        addComments();
        commentsAmount = commentsList.children.length;
      }
      if (commentsAmount === comments.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', appendCommentsToList);
      }
      document.querySelector('.comments-count-now').textContent = commentsAmount;
    };
  }


  function onBigPictureEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (evt.target !== commentInput) {
        closeBigPicture();
      }
    }
  }
};


export { drawBigPicture };
