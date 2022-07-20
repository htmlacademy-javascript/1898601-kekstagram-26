const pictureItemTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const drawPictures = function (pictures) {
  const picturesListFragment = document.createDocumentFragment();
  pictures.forEach(({ url, likes, comments }) => {
    const picturesListItem = pictureItemTemplate.cloneNode(true);
    picturesListItem.querySelector('.picture__img').src = url;
    picturesListItem.querySelector('.picture__likes').textContent = likes;
    picturesListItem.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.append(picturesListItem);
  });
  picturesList.append(picturesListFragment);
};

export { drawPictures };
