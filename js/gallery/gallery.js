import { PHOTOS_SIZE, createPhoto } from '../data.js';
import { drawThumbnails } from './draw-thumbnails.js';

const photos = Array.from({ length: PHOTOS_SIZE }, (elem, index) => createPhoto(index));
drawThumbnails(photos);
