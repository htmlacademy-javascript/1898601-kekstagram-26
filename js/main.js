import { MAX_STRING_LENGTH, PHOTOS_SIZE, createPhoto } from './data.js';
import {
  getRandomPositiveInteger
  , checkStringLength, returnArray
} from './util.js';

getRandomPositiveInteger(1, 5);
checkStringLength('Hello my name is...', MAX_STRING_LENGTH);
const photos = Array.from({ length: PHOTOS_SIZE }, (elem, index) => createPhoto(index));
returnArray(photos);
