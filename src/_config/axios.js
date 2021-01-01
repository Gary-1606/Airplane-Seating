import axios from 'axios';

const instance = axios.create({
    baseURL: "" // Use the baseURL for API calls here
});

export default instance;