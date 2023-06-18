import axios from 'axios';
import { EMBED_URL } from '../config.js';

const API_KEY = '8260a7b490f140fde24b8a24b034994a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbApi = {
  async detail(category, id, options = {}) {
    const url = `${BASE_URL}/${category}/${id}`;
    const params = {
      api_key: API_KEY,
      ...options.params,
    };
    const response = await axios.get(url, { params });
    return response.data;
  },
  async getTrendingList(category, options = {}) {
    const url = `${BASE_URL}/trending/${category}/week`;
    const params = {
      api_key: API_KEY,
      ...options.params,
    };
    const response = await axios.get(url, { params });
    return response.data;
  },
};

export const imageApi = {
  originalImage(path) {
    return `${IMAGE_BASE_URL}/original${path}`;
  },
  smallImage(path) {
    return `${IMAGE_BASE_URL}/w342${path}`;
  },
};

export function embedMovie(id) {
  return `${EMBED_URL}/${id}`;
}

export function embedEpisode(id, season, episode) {
  return `${EMBED_URL}/${id}/${season}/${episode}`;
}
