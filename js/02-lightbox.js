import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

function createGallery(images) {
  return images
    .map(item => {
      const { preview, original, description } = item;
        return `
        <li class="gallery__item">
        <a class="gallery__link" href=${original}>
        <img class="gallery__image"
        src=${preview}
        alt='${description}'
        />
        </a>
        </li>`;
    })
    .join('');
}
gallery.innerHTML = createGallery(galleryItems);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});