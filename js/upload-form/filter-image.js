const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderField = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');


const createSliderSetting = function (MIN, MAX, STEP, EFFECT) {
  return {
    MIN,
    MAX,
    STEP,
    EFFECT,
  };
};


const SLIDER_SETTINGS = {
  'effects__preview--none': createSliderSetting(1, 1, 0, ''),
  'effects__preview--chrome': createSliderSetting(0, 1, 0.1, 'grayscale'),
  'effects__preview--sepia': createSliderSetting(0, 1, 0.1, 'sepia'),
  'effects__preview--marvin': createSliderSetting(0, 100, 1, 'invert'),
  'effects__preview--phobos': createSliderSetting(0, 3, 0.1, 'blur'),
  'effects__preview--heat': createSliderSetting(1, 3, 0.1, 'brightness'),
};

effectValueElement.value = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});


const getFilterClass = function (filterElement) {
  return filterElement.querySelector('.effects__preview').classList[1];
};


const updatePreviewEffect = function (image, effectValue) {
  const checkedFilted = effectsList.querySelector('.effects__radio:checked');
  const filterClass = getFilterClass(checkedFilted.closest('.effects__item'));
  console.log(checkedFilted);
};


sliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = sliderElement.noUiSlider.get();
  updatePreviewEffect(imagePreview, effectValueElement.value);
});


const addImageFilter = function (filterElement, image) {
  const filterClass = getFilterClass(filterElement);
  image.removeAttribute('class');
  image.classList.add(filterClass);
};


const updateEffectSlider = function (filterElement) {
  const filterClass = getFilterClass(filterElement);
  if (filterClass === 'effects__preview--none') {
    sliderField.classList.add('hidden');
  }
  else {
    sliderField.classList.remove('hidden');
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: SLIDER_SETTINGS[filterClass].MIN,
      max: SLIDER_SETTINGS[filterClass].MAX,
    },
    step: SLIDER_SETTINGS[filterClass].STEP,
  });
  sliderElement.noUiSlider.set(SLIDER_SETTINGS[filterClass].MAX);
};


effectsList.addEventListener('click', (evt) => {
  const clickedItem = evt.target.closest('.effects__radio');
  if (clickedItem && clickedItem.matches('.effects__radio')) {
    const effectsListItem = clickedItem.closest('.effects__item');
    addImageFilter(effectsListItem, imagePreview);
    updateEffectSlider(effectsListItem);
  }
});
