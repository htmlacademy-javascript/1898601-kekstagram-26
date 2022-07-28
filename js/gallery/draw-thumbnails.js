import { drawBigPicture } from './draw-big-pictures.js';
import { appendElementsToList } from '../util.js';

const thumbnailItemTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsList = document.querySelector('.pictures');


const makeThumbnailsListItem = function (picture) {
  const listItem = thumbnailItemTemplate.cloneNode(true);
  listItem.querySelector('.picture__img').src = picture.url;
  listItem.querySelector('.picture__likes').textContent = picture.likes;
  listItem.querySelector('.picture__comments').textContent = picture.comments.length;
  listItem.addEventListener('click', () => {
    drawBigPicture(picture);
  });
  return listItem;
};


const drawThumbnails = function (thumbnails) {
  appendElementsToList(thumbnails, thumbnailsList, makeThumbnailsListItem);
};


export { drawThumbnails };
