import { showFormSuccess, showFormError } from './show-form-message.js';
import { pristine } from './validate-form.js';
import { sendData } from '../server-api.js';

const form = document.querySelector('#upload-select-image');
const submitButton = form.querySelector('.img-upload__submit');


const setUserFormSubmit = function (onSuccess, onFail) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      submitButton.disabled = true;
      sendData(
        () => {
          onSuccess();
          submitButton.disabled = false;
        },
        () => {
          onFail();
          submitButton.disabled = false;
        },
        new FormData(evt.target),
      );
    }
  });
};


setUserFormSubmit(showFormSuccess, showFormError);
