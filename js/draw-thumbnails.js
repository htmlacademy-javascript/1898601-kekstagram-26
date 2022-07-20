import { drawBigPicture } from './draw-big-pictures.js';

const pictureItemTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const drawPictures = function (pictures) {
  const picturesListFragment = document.createDocumentFragment();
  pictures.forEach( (picture) => {
    const picturesListItem = pictureItemTemplate.cloneNode(true);
    picturesListItem.querySelector('.picture__img').src = picture.url;
    picturesListItem.querySelector('.picture__likes').textContent = picture.likes;
    picturesListItem.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesListItem.addEventListener('click', () => {
      drawBigPicture(picture);
    });
    picturesListFragment.append(picturesListItem);
  });
  picturesList.append(picturesListFragment);
};

export { drawPictures };
