import { makeElement } from './util.js';
const bigPictureElement = document.querySelector('.big-picture');
const commentsList = bigPictureElement.querySelector('.social__comments');


const drawBigPicture = function ({ url, likes, comments, description }) {
  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    //better use pre-generated template?
    const listItem = makeElement('li', 'social__comment');
    const listItemImage = makeElement('img', 'social__picture');
    listItemImage.src = comment.avatar;
    listItemImage.alt = comment.name;
    listItemImage.width = '35';
    listItemImage.height = '35';
    listItem.append(listItemImage);
    const listItemParagraph = makeElement('p', 'social__text', comment.message);
    listItem.append(listItemParagraph);
    commentsListFragment.append(listItem);
  });
  commentsList.innerHTML = '';
  commentsList.append(commentsListFragment);
};

export { drawBigPicture };
