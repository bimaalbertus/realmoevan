// Typically we would store in {process.env.API_KEY}
const API_KEY = "8260a7b490f140fde24b8a24b034994a";

const requests = {
  fetchPopularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchComingSoon: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  fetchRecommendations: `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
  fetchPopular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchPopular2: `/movie/popular?api_key=${API_KEY}&language=en-US&page=2`,
  fetchSimilar: `https://api.themoviedb.org/3/movie//similar?api_key=${API_KEY}&language=en-US&page=1`,
};

export default requests;
