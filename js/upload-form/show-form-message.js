import { closeUserForm } from './show-form.js';
import { isEscapeKey } from '../util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const successCloseButton = successMessage.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorCloseButton = errorMessage.querySelector('.error__button');

const imageOverlay = document.querySelector('.img-upload__overlay');


const closeFormSuccess = function () {
  document.body.removeChild(successMessage);
  document.removeEventListener('keydown', onFormSuccessEscKeydown);
  document.removeEventListener('click', onFormSuccessWindowClick);
  successCloseButton.removeEventListener('click', closeFormSuccess);
};


function onFormSuccessEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormSuccess();
  }
}


function onFormSuccessWindowClick(evt) {
  if (!evt.target.closest('.success__inner')) {
    closeFormSuccess();
  }
}


const closeFormError = function () {
  document.body.removeChild(errorMessage);
  document.removeEventListener('keydown', onFormErrorEscKeydown);
  document.removeEventListener('click', onFormErrorWindowClick);
  errorCloseButton.removeEventListener('click', closeFormError);
  if (this === errorCloseButton) {
    imageOverlay.classList.remove('hidden');
  }
  else {
    closeUserForm();
  }
};


function onFormErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormError();
  }
}


function onFormErrorWindowClick(evt) {
  if (!evt.target.closest('.error__inner')) {
    closeFormError();
  }
}


const showFormMessage = function (element) {
  document.body.append(element);

  if (element === successMessage) {
    successCloseButton.addEventListener('click', closeFormSuccess);
    document.addEventListener('keydown', onFormSuccessEscKeydown);
    document.addEventListener('click', onFormSuccessWindowClick);
  }
  else if (element === errorMessage) {
    errorCloseButton.addEventListener('click', closeFormError);
    document.addEventListener('keydown', onFormErrorEscKeydown);
    document.addEventListener('click', onFormErrorWindowClick);
  }
};


const showFormSuccess = function () {
  closeUserForm();
  showFormMessage(successMessage);
};


const showFormError = function () {
  imageOverlay.classList.add('hidden');
  showFormMessage(errorMessage);
};

export { showFormSuccess, showFormError };
