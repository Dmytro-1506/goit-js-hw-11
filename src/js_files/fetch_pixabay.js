import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";

const KEY = '32403281-07d99c56a2826923173cf204d';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    submitButton: document.querySelector('.submit-button'),
    loadMoreBtn: document.querySelector('.load-more'),
}

let pageNumber = 1;
let nameOfRequest = '';

refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    refs.loadMoreBtn.classList.add('visually-hidden');
    refs.gallery.innerHTML = '';
    pageNumber = 1
    nameOfRequest = refs.input.value;
    getMyPhotos(nameOfRequest);
})

function quantityOfSearchResults(number) {
    Notiflix.Notify.success(`Hooray! We found ${number} images.`);
}

function endOfSerchResults() {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

function notFound() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

async function getMyPhotos(name) {
    let totalHits = null;
    let numberOfImages = refs.gallery.children.length;
    const request = fetch(`https://pixabay.com/api/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`);
    const myPhotos = await request.then(
        response => {
            return response.json();
        }).then(response => {
            totalHits = response.totalHits;
            if (!totalHits) {
                notFound();
            } else if (totalHits === numberOfImages) {
                endOfSerchResults();
            }
            else if(numberOfImages === 0) {
                quantityOfSearchResults(totalHits);
                refs.loadMoreBtn.classList.remove('visually-hidden');
            }
            const parametersArrey = [];
            response.hits.map(el => {
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
            return parametersArrey;
        }).catch(err => {
            console.log(err);
        })
    const photosList = [];
    myPhotos.map(photo => {
        photosList.push(`<div class="photo-card gallery__item"><a class="gallery__link" href=${photo.largeImageURL}><img class="gallery__image" src=${photo.webformatURL} alt=${photo.tags} loading="lazy" /></a><div class="info"><p class="info-item"><b>Views: ${photo.views} | Comments: ${photo.comments}</b></p><p class="info-item"><b>Likes: ${photo.likes} | Downloads: ${photo.downloads}</b></p></div></div>`);
    });
    refs.gallery.insertAdjacentHTML("beforeend", photosList.join(''));
    let gallery = new SimpleLightbox('.gallery a');
}

refs.gallery.addEventListener('click', (event) => {
    event.preventDefault();
})

refs.loadMoreBtn.addEventListener('click', (event) => {
    pageNumber += 1;
    getMyPhotos(nameOfRequest);
})