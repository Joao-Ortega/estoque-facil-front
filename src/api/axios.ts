import axios from 'axios';
console.log(process.env.BASE_URL);

const requestApi = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
});

export default requestApi;