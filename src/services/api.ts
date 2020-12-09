import axios from 'axios';

const api = axios.create({
  baseURL: 'http://giovanni.smartbr.com:3000',
});

export default api;
