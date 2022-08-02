import { transformScaleElement } from '../util.js';

const ImageScaling = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const controlScale = document.querySelector('.img-upload__scale');
const controlField = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');


const scalePreviewImage = function (scaleValue) {
  controlField.value = `${scaleValue}%`;
  transformScaleElement(imagePreview, scaleValue / 100);
};


const scaleImage = (evt) => {
  const targetElement = evt.target;
  const controlValue = parseInt(controlField.value, 10);

  if (targetElement.classList.contains('scale__control--smaller')) {
    if (controlValue > ImageScaling.MIN) {
      const newValue = controlValue - ImageScaling.STEP;
      scalePreviewImage(newValue);
    }
  }
  else if (targetElement.classList.contains('scale__control--bigger')) {
    if (controlValue < ImageScaling.MAX) {
      const newValue = controlValue + ImageScaling.STEP;
      scalePreviewImage(newValue);
    }
  }
};


const addPreviewScaling = function () {
  controlScale.addEventListener('click', scaleImage);
};


const removePreviewScaling = function () {
  controlScale.removeEventListener('click', scaleImage);
  scalePreviewImage(100);
};


export { addPreviewScaling, removePreviewScaling };
