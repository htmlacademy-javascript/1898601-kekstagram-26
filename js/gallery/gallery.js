import { drawThumbnails } from './draw-thumbnails.js';
import { showErrorMessage } from '../util.js';
import { getData } from '../server-api.js';

getData(drawThumbnails, showErrorMessage);
