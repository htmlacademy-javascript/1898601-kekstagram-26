import { appendItemsToList } from './util.js';
const bigPictureElement = document.querySelector('.big-picture');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentsListItem = commentsList.querySelector('.social__comment');


const makeCommentsListItem = function ({ avatar, name, message }) {
  const listItem = commentsListItem.cloneNode(true);
  const listItemImage = listItem.querySelector('.social__picture');
  listItemImage.src = avatar;
  listItemImage.alt = name;
  listItem.querySelector('.social__text').textContent = message;
  return listItem;
};


const drawBigPicture = function ({ url, likes, comments, description }) {
  document.body.classList.add('modal-open');
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');


  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', (evt) => {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    bigPictureElement.classList.add('hidden');
  });


  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      document.body.classList.remove('modal-open');
      bigPictureElement.classList.add('hidden');
    }
  });


  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';
  appendItemsToList(comments, commentsList, makeCommentsListItem);
};


export { drawBigPicture };
