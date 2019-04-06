import axios from 'axios';
import localStorage from 'local-storage';

const config = {
  headers: {
    Authorization: localStorage.get('jwt_token'),
    'Content-Type': 'application/json'
  }};

export default {
  get: (url) => axios.get(url, config),
  post: (url, data) => axios.post(url, data, config),
  put: (url, data) => axios.put(url, data, config),
  delete: (url) => axios.delete(url, config),
};
