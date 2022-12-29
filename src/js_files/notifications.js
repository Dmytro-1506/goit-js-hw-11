import Notiflix from "notiflix";

export default class MyNotifications {
    quantityOfImages(number) {
        Notiflix.Notify.success(`Hooray! We found ${number} images.`);
    }
    endOfSerchResults() {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    notFound() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}
}