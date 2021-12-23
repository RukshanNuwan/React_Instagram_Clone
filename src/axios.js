import axios from 'axios';

const base_url = axios.create({
  baseURL: 'http://localhost:8000'
});

export default base_url;
