import axios from 'axios';
import queryString from 'query-string';
import { TMDB_API_KEY, TMDB_URL } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: "8260a7b490f140fde24b8a24b034994a" }),
});

axiosInstance.interceptors.request.use(async (config) => config);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  },
);

export default axiosInstance;
