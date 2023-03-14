import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
  theme: light,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLanguage: (state, action) => {},
    setTheme: (state, action) => {},
  },
});

export const { setLanguage, setTheme } = globalSlice.actions;

export default globalSlice.reducer;
