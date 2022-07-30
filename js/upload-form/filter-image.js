import { changeElementClass } from '../util.js';

const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.setAttribute('disabled', true);


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
  'effects__preview--none': createSliderSetting('', '', '', ''),
  'effects__preview--chrome': createSliderSetting(0, 1, 0.1, 'grayscale'),
  'effects__preview--sepia': createSliderSetting(0, 1, 0.1, 'sepia'),
  'effects__preview--marvin': createSliderSetting(0, 100, 1, 'invert', '%'),
  'effects__preview--phobos': createSliderSetting(0, 3, 0.1, 'blur', 'px'),
  'effects__preview--heat': createSliderSetting(1, 3, 0.1, 'brightness'),
};


const getEffectClass = function (effectElement) {
  return effectElement.querySelector('.effects__preview').classList[1];
};


const updateImageEffectValue = function (image, effectLevel) {
  const checkedEffect = effectsList.querySelector('.effects__radio:checked');
  const effectClass = getEffectClass(checkedEffect.closest('.effects__item'));
  const effectFilter = SLIDER_SETTINGS[effectClass].EFFECT;
  const effectUnits = SLIDER_SETTINGS[effectClass].UNITS || '';
  image.style.filter = `${effectFilter}(${effectLevel}${effectUnits})`;
};


const updateEffectSlider = function (effectClass) {
  if (effectClass === 'effects__preview--none') {
    sliderWrapper.classList.add('hidden');
    sliderElement.setAttribute('disabled', true);
    imagePreview.style.filter = '';
    effectLevelElement.value = '';
  }
  else {
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
  }
};


effectsList.addEventListener('click', (evt) => {
  const clickedItem = evt.target.closest('.effects__radio');
  if (clickedItem && clickedItem.matches('.effects__radio')) {
    const effectsListItem = clickedItem.closest('.effects__item');
    const effectClass = getEffectClass(effectsListItem);
    const imageClass = imagePreview.classList[0];
    changeElementClass(imagePreview, imageClass, effectClass);
    updateEffectSlider(effectClass);
  }
});


sliderElement.noUiSlider.on('update', () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  updateImageEffectValue(imagePreview, effectLevelElement.value);
});
