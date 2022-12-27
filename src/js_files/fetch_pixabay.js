import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const KEY = '32403281-07d99c56a2826923173cf204d';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    submitButton: document.querySelector('.submit-button'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const options = {
    q: 'asdasd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
};

refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    let nameOfRequest = refs.input.value;
    getMyPhotos(nameOfRequest);
})

function toManyMatches() {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

function errorName() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

async function getMyPhotos(name) {
    const request = fetch(`https://pixabay.com/api/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`, options);
    const myPhotos = await request.then(
        response => {
            return response.json();
        }).then(response => {
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
    refs.gallery.innerHTML = photosList.join('');
    let gallery = new SimpleLightbox('.gallery a');
}

refs.gallery.addEventListener('click', (event) => {
    event.preventDefault();
})
