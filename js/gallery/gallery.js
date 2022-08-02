import { drawFirstInteraction } from './draw-thumbnails.js';
import { showErrorMessage } from '../util.js';
import { getData } from '../server-api.js';

getData(drawFirstInteraction, showErrorMessage);
