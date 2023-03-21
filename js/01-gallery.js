import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

// //   const galleryItem = document.createElement('div');
// //   galleryItem.classList.add('gallery__item');

// //   const galleryLink = document.createElement('a');
// //   galleryLink.classList.add('gallery__link');
// //   galleryLink.href = item.original;

// //   const galleryImage = document.createElement('img');
// //   galleryImage.classList.add('gallery__image');
// //   galleryImage.src = item.preview;
// //   galleryImage.setAttribute('data-source', item.original);
// //   galleryImage.alt = item.description;

// //   galleryItem.appendChild(galleryLink);
// //   galleryLink.appendChild(galleryImage);

// // gallery.appendChild(galleryItem);
// // });

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
gallery.insertAdjacentHTML('beforeend', createGallery(galleryItems));

gallery.addEventListener('click', e => {
  e.preventDefault();

  const target = e.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const originalImageUrl = target.dataset.source;

  const modalImgOriginal = basicLightbox.create(`
    <div class='modal'>
      <img class='modal__image'
      src='${originalImageUrl}'
      alt='${target.alt}' 
      />
    </div>`);

  modalImgOriginal.show();

  function closeModal() {
    modalImgOriginal.close();
    document.removeEventListener('keydown', handKeyPress);
  }

  const modalImage = modalImgOriginal.element().querySelector('.modal__image');

  modalImage.addEventListener('click', closeModal);

  function handKeyPress(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  document.addEventListener('keydown', handKeyPress);

  modalImgOriginal.on('hidden', () => {
    modalImage.removeEventListener('click', closeModal);
  });
});