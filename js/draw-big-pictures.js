import { appendItemsToList } from './util.js';
const bigPictureElement = document.querySelector('.big-picture');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentsListItem = commentsList.querySelector('.social__comment');
const bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');


const closeBigPicture = function () {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
};


function onBigPictureEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}


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
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onBigPictureEscKeyDown);

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  appendItemsToList(comments, commentsList, makeCommentsListItem);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};


export { drawBigPicture };
