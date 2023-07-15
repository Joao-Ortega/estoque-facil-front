import axios from 'axios';

const requestApi = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'},
});

export default requestApi;