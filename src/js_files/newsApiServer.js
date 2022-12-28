export default class NewsApiServer {
    constructor(){
        this.requestName = '';
    }

    fetchImages() {
        const KEY = '32403281-07d99c56a2826923173cf204d';
    }

    get request() {
        return this.requestName;
    }
    
    set request(newRequest) {
        this.requestName = newRequest;
    }
}