import { changeElementClass, changeCheckedItem } from '../util.js';

const FILTER_CLASSES = {
  ORIGINAL: 'effects__preview--none',
  CHROME: 'effects__preview--chrome',
  SEPIA: 'effects__preview--sepia',
  MARVIN: 'effects__preview--marvin',
  PHOBOS: 'effects__preview--phobos',
  HEAT: 'effects__preview--heat',
};


const createSliderSetting = function (MIN, MAX, STEP, EFFECT, UNITS) {
  return {
    MIN,
    MAX,
    STEP,
    EFFECT,
    UNITS,
  };
};


const SLIDER_SETTINGS = {
  [FILTER_CLASSES.ORIGINAL]: createSliderSetting('', '', '', ''),
  [FILTER_CLASSES.CHROME]: createSliderSetting(0, 1, 0.1, 'grayscale'),
  [FILTER_CLASSES.SEPIA]: createSliderSetting(0, 1, 0.1, 'sepia'),
  [FILTER_CLASSES.MARVIN]: createSliderSetting(0, 100, 1, 'invert', '%'),
  [FILTER_CLASSES.PHOBOS]: createSliderSetting(0, 3, 0.1, 'blur', 'px'),
  [FILTER_CLASSES.HEAT]: createSliderSetting(1, 3, 0.1, 'brightness'),
};

const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');
const originalEffect = effectsList.querySelector('#effect-none');


const removePictureEffect = function () {
  const imageClass = imagePreview.classList[0];
  changeElementClass(imagePreview, imageClass, FILTER_CLASSES.ORIGINAL);
  const checkedEffect = effectsList.querySelector('.effects__radio:checked');
  changeCheckedItem(checkedEffect, originalEffect);
  sliderWrapper.classList.add('hidden');
  sliderElement.setAttribute('disabled', true);
  imagePreview.style.filter = '';
  effectLevelElement.value = '';
};


const setPictureEffect = function (effectClass) {
  const imageClass = imagePreview.classList[0];
  changeElementClass(imagePreview, imageClass, effectClass);
  sliderElement.removeAttribute('disabled');
  sliderWrapper.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: SLIDER_SETTINGS[effectClass].MIN,
      max: SLIDER_SETTINGS[effectClass].MAX,
    },
    step: SLIDER_SETTINGS[effectClass].STEP,
  });
  sliderElement.noUiSlider.set(SLIDER_SETTINGS[effectClass].MAX);
};


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

removePictureEffect();


const getEffectClass = function (effectElement) {
  return effectElement.querySelector('.effects__preview').classList[1];
};


const updatePictureEffectValue = function (image, effectLevel) {
  const checkedEffect = effectsList.querySelector('.effects__radio:checked');
  const effectClass = getEffectClass(checkedEffect.closest('.effects__item'));
  const effectFilter = SLIDER_SETTINGS[effectClass].EFFECT;
  const effectUnits = SLIDER_SETTINGS[effectClass].UNITS || '';
  image.style.filter = `${effectFilter}(${effectLevel}${effectUnits})`;
};


const updatePictureEffect = function (effectClass) {
  if (effectClass === FILTER_CLASSES.ORIGINAL) {
    removePictureEffect();
  }
  else {
    setPictureEffect(effectClass);
  }
};


effectsList.addEventListener('click', (evt) => {
  const clickedItem = evt.target.closest('.effects__radio');
  if (clickedItem && clickedItem.matches('.effects__radio')) {
    const effectsListItem = clickedItem.closest('.effects__item');
    const effectClass = getEffectClass(effectsListItem);
    updatePictureEffect(effectClass);
  }
});


sliderElement.noUiSlider.on('update', () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  updatePictureEffectValue(imagePreview, effectLevelElement.value);
});


export { removePictureEffect };
