import { TMDB_IMAGE_URL } from '../config';

const imageApi = {
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  w200Image: (imgPath) => `https://image.tmdb.org/t/p/w200/${imgPath}`,
  w92Image: (imgPath) => `https://image.tmdb.org/t/p/w92/${imgPath}`,
};

export { imageApi };
