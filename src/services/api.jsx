import axios from 'axios';

//base da url: https://api.themoviedb.org/3/
// url da api: /movie/now_playing/?api_key=c14970b8e2e57529ee280ce460850ce5

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'

});

export default api;