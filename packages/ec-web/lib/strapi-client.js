export default class StrapiClient {
    constructor() {}

    async fetchData(path){
        const requestURL = `${process.env.API_URL}${path}`;
        console.log(requestURL);
        const response = await fetch(requestURL);
        const data = await response.json();
        return data;
    }
}