import { transformScaleElement } from '../util.js';
const controlScale = document.querySelector('.img-upload__scale');
const controlField = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const IMAGE_SCALING = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};


const scaleImage = (evt) => {
  const targetElement = evt.target;
  const controlValue = parseInt(controlField.value, 10);

  if (targetElement.classList.contains('scale__control--smaller')) {
    if (controlValue > IMAGE_SCALING.MIN) {
      const newValue = controlValue - IMAGE_SCALING.STEP;
      controlField.value = `${newValue}%`;
      transformScaleElement(imagePreview, newValue / 100);
    }
  }
  else if (targetElement.classList.contains('scale__control--bigger')) {
    if (controlValue < IMAGE_SCALING.MAX) {
      const newValue = controlValue + IMAGE_SCALING.STEP;
      controlField.value = `${newValue}%`;
      transformScaleElement(imagePreview, newValue / 100);
    }
  }
};


const addPreviewScaling = function () {
  controlScale.addEventListener('click', scaleImage);
};


const removePreviewScaling = function () {
  controlScale.removeEventListener('click', scaleImage);
};


export { addPreviewScaling, removePreviewScaling };
