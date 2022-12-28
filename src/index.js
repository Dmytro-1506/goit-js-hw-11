import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import Notiflix from "notiflix";

import { request } from "./js_files/fetch_pixabay";

import NewsApiServer from "./js_files/newsApiServer";

const newApiServer = new NewsApiServer();

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    submitButton: document.querySelector('.submit-button'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    newApiServer.requestName = refs.input.value;
})
