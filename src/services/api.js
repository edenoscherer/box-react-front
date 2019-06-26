import axios from 'axios';

const api = axios.create({
  baseURL: 'https://edeno-box.herokuapp.com',
});

export default api;
