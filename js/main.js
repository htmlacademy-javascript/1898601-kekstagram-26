import { PHOTOS_SIZE, createPhoto } from './data.js';
import { drawPictures } from './draw-pictures.js';

const photos = Array.from({ length: PHOTOS_SIZE }, (elem, index) => createPhoto(index));
drawPictures(photos);
