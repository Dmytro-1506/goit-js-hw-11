import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import Notiflix from "notiflix";

import { request } from "./js_files/fetch_pixabay";

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    submitButton: document.querySelector('.submit-button'),
    loadMoreBtn: document.querySelector('.load-more'),
}