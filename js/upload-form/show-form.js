import { isEscapeKey } from '../util.js';
import { addPreviewScaling, removePreviewScaling } from './scale-form-image.js';
import { removePictureEffect } from './filter-image.js';
import { pristine } from './validate-form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageForm = document.querySelector('#upload-select-image');
const imageField = imageForm.querySelector('#upload-file');
const imageOverlay = imageForm.querySelector('.img-upload__overlay');
const imagePreview = imageOverlay.querySelector('.img-upload__preview img');
const imageOverlayCancel = imageOverlay.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


const restoreFormDefault = function () {
  imageField.value = '';
  imagePreview.src = 'img/upload-default-image.jpg';
  removePreviewScaling();
  removePictureEffect();
  hashtagsInput.value = '';
  commentInput.value = '';
  pristine.validate();
};


const hideUserForm = function () {
  document.body.classList.remove('modal-open');
  imageOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  imageOverlayCancel.removeEventListener('click', closeUserForm);
};


function closeUserForm() {
  hideUserForm();
  restoreFormDefault();
}


const showUserForm = function () {
  document.body.classList.add('modal-open');
  imageOverlay.classList.remove('hidden');
  addPreviewScaling();
  document.addEventListener('keydown', onModalEscKeydown);
  imageOverlayCancel.addEventListener('click', closeUserForm);
};


function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!(evt.target === hashtagsInput || evt.target === commentInput)) {
      closeUserForm();
    }
  }
}


imageField.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      imagePreview.src = URL.createObjectURL(file);
      showUserForm();
    }
  }
});


export { closeUserForm, showUserForm };
