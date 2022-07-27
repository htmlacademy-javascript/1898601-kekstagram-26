import { countValueInArray, checkStringLength } from '../util.js';
import { MAX_DESCRIPTION_LENGTH } from '../data.js';

const form = document.querySelector('#upload-select-image');
const formHashtags = form.querySelector('.text__hashtags');
const formComment = form.querySelector('.text__description');

const HASHTAG_RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


const validateHashtags = function (value) {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.split(' ').map((element) => element.toLowerCase());

  const isValidHashtags = hashtags.every((hashtag) => {
    const isUniqueHashTag = countValueInArray(hashtags, hashtag) === 1;
    return HASHTAG_RE.test(hashtag) && isUniqueHashTag;
  }) && hashtags.length <= 5;

  return isValidHashtags;
};


const validateComment = function (comment) {
  return checkStringLength(comment, MAX_DESCRIPTION_LENGTH);
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, false);


pristine.addValidator(formHashtags, validateHashtags, 'Неверный формат хэштегов.');
pristine.addValidator(formComment, validateComment, 'Длина комментария не может составлять больше 140 символов.');


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
