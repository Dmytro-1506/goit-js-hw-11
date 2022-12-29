import axios from 'axios';
export default class NewsApiServer {
    constructor(){
        let requestName = '';
    }

    async fetchImages(pageNumber) {
        const KEY = '32403281-07d99c56a2826923173cf204d';

        try {
            const request = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${this.requestName}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`);
            return request;
        } catch (error) {
            console.log(error);
        }
    }

    get request() {
        return this.requestName;
    }
    
    set request(newRequest) {
        this.requestName = newRequest;
    }
}