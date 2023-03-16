import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

// galleryItems.forEach(item => {
//   const galleryItem = document.createElement('div');
//   galleryItem.classList.add('gallery__item');

//   const galleryLink = document.createElement('a');
//   galleryLink.classList.add('gallery__link');
//   galleryLink.href = item.original;

//   const galleryImage = document.createElement('img');
//   galleryImage.classList.add('gallery__image');
//   galleryImage.src = item.preview;
//   galleryImage.setAttribute('data-source', item.original);
//   galleryImage.alt = item.description;

//   galleryItem.appendChild(galleryLink);
//   galleryLink.appendChild(galleryImage);

// gallery.appendChild(galleryItem);
// });

function createGallery(images) {
    return images
    .map(item => {
    const { preview, original, description } = item;
        return `
        <div class='gallery__item'>
          <a class='gallery__link' href=${original}>
            <img
              class='gallery__image'
              src=${preview}
              alt='${description}'
              data-source=${original}
            />
          </a>
        </div>`;
    })
        .join('');
}
gallery.innerHTML = createGallery(galleryItems);

gallery.addEventListener('click', e => {
  e.preventDefault();

  const target = e.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const originalImgUrl = target.dataset.source;
  const modalImg = document.createElement('img');

  modalImg.src = originalImgUrl;
  modalImg.alt = target.alt;

  basicLightbox.create(modalImg).show();

const modalImgOriginal = basicLightbox.create(
  `<div class='modal'>
    <img class='modal__image'
    alt='${target.alt}'
    src='${originalImgUrl}'
    />
  </div>`,
  {
    onClose: () => {
      document.removeEventListener('keydown', onEscKeyPress);
    },
  }
);

  const onEscKeyPress = e => {
    if (e.code === 'Escape') {
      modalImgOriginal.close();
    }
  };

  document.addEventListener('keydown', onEscKeyPress);
  modalImgOriginal.show();
});