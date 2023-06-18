import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: "",
  
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload.series;
    },
  },
});

export const { setSeries } = seriesSlice.actions;

export const selectSeries = (state) => state.series.series;

export default seriesSlice.reducer;