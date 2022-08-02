import { drawBigPicture } from './draw-big-pictures.js';
import {
  appendElementsToList, debounce,
  getNRandomElementsFromArray
} from '../util.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const thumbnailItemTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsList = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');


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


const reDrawThumbnails = function (thumbnails) {
  const actualPictures = document.querySelectorAll('.picture');
  actualPictures.forEach((elem) => elem.remove());
  appendElementsToList(thumbnails, thumbnailsList, makeThumbnailsListItem);
};


const changeActiveFilter = function (newFilterElement) {
  const checkedFilter = imgFiltersForm.querySelector('.img-filters__button--active');
  checkedFilter.classList.remove('img-filters__button--active');
  newFilterElement.classList.add('img-filters__button--active');
};


const setDefaultClick = (cb) => {
  const defaultFilterButton = imgFiltersForm.querySelector('#filter-default');
  defaultFilterButton.addEventListener('click', () => {
    changeActiveFilter(defaultFilterButton);
    cb();
  });
};


const setRandomClick = (cb) => {
  const randomFilterButton = imgFiltersForm.querySelector('#filter-random');
  randomFilterButton.addEventListener('click', () => {
    changeActiveFilter(randomFilterButton);
    cb();
  });
};


const setDiscussedClick = (cb) => {
  const discussedFilterButton = imgFiltersForm.querySelector('#filter-discussed');
  discussedFilterButton.addEventListener('click', () => {
    changeActiveFilter(discussedFilterButton);
    cb();
  });
};


const drawFirstInteraction = function (thumbnails) {
  drawThumbnails(thumbnails.slice());
  imgFilters.classList.remove('img-filters--inactive');

  setDefaultClick(debounce(
    () => reDrawThumbnails(thumbnails.slice()),
    RERENDER_DELAY));
  setRandomClick(debounce(
    () => reDrawThumbnails(
      getNRandomElementsFromArray(thumbnails, RANDOM_PHOTOS_COUNT)),
    RERENDER_DELAY));
  setDiscussedClick(debounce(
    () => reDrawThumbnails(thumbnails.slice().sort((a, b) => b.likes - a.likes)),
    RERENDER_DELAY));
};


export { drawFirstInteraction };
