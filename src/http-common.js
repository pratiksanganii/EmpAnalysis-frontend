import axios from 'axios';
const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
axios.interceptors.request.use(() => {});
http.interceptors.request.use((req) => {
  if (req.files) req.body = req.files;
  req.headers.access_token = localStorage.getItem('accessToken');
  return req;
});
export default http;
