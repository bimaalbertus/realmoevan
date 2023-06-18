import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forYou: "",
  marvel: "",
  newFilm:"",
  disneyPixar: "",
  trending: "",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.marvel = action.payload.marvel;
      state.disneyPixar = action.payload.disneyPixar;
      state.trending = action.payload.trending;
      state.newFilm = action.payload.newFilm;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectMarvel = (state) => state.movie.marvel;
export const selectdisneyPixar = (state) => state.movie.disneyPixar;
export const selectTrending = (state) => state.movie.trending;
export const selectnewFilm = (state) => state.movie.newFilm;

export default movieSlice.reducer;