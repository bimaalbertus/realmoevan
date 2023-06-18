const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '8260a7b490f140fde24b8a24b034994a',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;