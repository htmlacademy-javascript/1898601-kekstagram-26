const imageForm = document.querySelector('#upload-select-image');
const imageField = imageForm.querySelector('#upload-file');
const imageOverlay = imageForm.querySelector('.img-upload__overlay');
const imagePreview = imageOverlay.querySelector('.img-upload__preview img');
const imageOverlayCancel = imageOverlay.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


const closeUserModal = function () {
  document.body.classList.remove('modal-open');
  imageOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  imageOverlayCancel.removeEventListener('click', closeUserModal);
  imageField.value = '';
};


const showUserModal = function () {
  document.body.classList.add('modal-open');
  imageOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
  imageOverlayCancel.addEventListener('click', closeUserModal);
};


function onModalEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (!(evt.target === hashtagsInput || evt.target === commentInput)) {
      closeUserModal();
    }
  }
}


const showUploadForm = function () {
  imageField.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
      // imagePreview.src = imageField.value; - Not allowed to load local resource file
      // imagePreview.src = '../photos/1.jpg';
      showUserModal();
    }
  });
};

export { showUploadForm };
