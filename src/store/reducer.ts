import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Initial state
const initialState: WeatherDataState = {
  weatherInfos: [],
  // other initial state properties...
};

const appSlice = createSlice({
  name: "WeatherInfo",
  initialState,
  reducers: {
    saveObject: (state, action) => {
      state.weatherInfos.push(action.payload);
    },
    removeObject: (state, action) => {
      state.weatherInfos = state.weatherInfos.filter(
        (data) => data.id !== action.payload
      );
    },
  },
});

export const { saveObject, removeObject } = appSlice.actions;
export default appSlice.reducer;
