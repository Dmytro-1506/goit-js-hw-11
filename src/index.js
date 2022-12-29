import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import MyNotifications from "./js_files/notifications";

import NewsApiServer from "./js_files/newsApiServer";

const myNotifications = new MyNotifications();
const newApiServer = new NewsApiServer();

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    submitButton: document.querySelector('.submit-button'),
    loadMoreBtn: document.querySelector('.load-more'),
}

let pageNumber = 1;
let totalHits = null;
let numberOfImages = 0;

refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    refs.loadMoreBtn.classList.add('visually-hidden');
    refs.gallery.innerHTML = '';
    pageNumber = 1;
    numberOfImages = 0;
    newApiServer.requestName = refs.input.value.trim();

    if (newApiServer.requestName) {
        getMyPhotos();
    }
})

async function getMyPhotos() {
    const myPhotos = await newApiServer.fetchImages(pageNumber);

    totalHits = myPhotos.data.totalHits;
    if (!totalHits) {
        myNotifications.notFound();
    } else if (numberOfImages === 0) {
        myNotifications.quantityOfImages(totalHits);
        refs.loadMoreBtn.classList.remove('visually-hidden');
    }

    const parametersArrey = [];
    myPhotos.data.hits.map(el => {
        parametersArrey.push(
            {
                webformatURL: el.webformatURL,
                largeImageURL: el.largeImageURL,
                tags: el.tags,
                likes: el.likes,
                views: el.views,
                comments: el.comments,
                downloads: el.downloads
            }
        )
    });
    const photosList = [];
    parametersArrey.map(photo => {
        photosList.push(`<div class="photo-card gallery__item"><a class="gallery__link" href=${photo.largeImageURL}><img class="gallery__image" src=${photo.webformatURL} alt=${photo.tags} loading="lazy" /></a><div class="info"><p class="info-item"><b>Views: ${photo.views} | Comments: ${photo.comments}</b></p><p class="info-item"><b>Likes: ${photo.likes} | Downloads: ${photo.downloads}</b></p></div></div>`);
    });
    refs.gallery.insertAdjacentHTML("beforeend", photosList.join(''));
    numberOfImages = refs.gallery.children.length;
    if (totalHits === numberOfImages && numberOfImages > 0) {
        myNotifications.endOfSerchResults();
        refs.loadMoreBtn.classList.add('visually-hidden');
    }
    let gallery = new SimpleLightbox('.gallery a');
}

refs.gallery.addEventListener('click', (event) => {
    event.preventDefault();
});

refs.loadMoreBtn.addEventListener('click', () => {
    pageNumber += 1;
    getMyPhotos();
});
