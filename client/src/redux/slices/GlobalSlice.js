import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dark, light } from "../../constants/Themes";
import {
  getAsyncStorage,
  removeAsyncStorage,
  setAsyncStorage,
} from "../../utils/asyncStorageHelper";

export const getLanguage = createAsyncThunk("global/getLang", async () => {
  const language = await getAsyncStorage("lang");
  return language;
});

export const setLanguage = createAsyncThunk("global/setLang", async (lang) => {
  await setAsyncStorage("lang", lang);
  return lang;
});

export const getTheme = createAsyncThunk("global/getTheme", async () => {
  const theme = await getAsyncStorage("theme");
  return theme === "light" ? light : dark;
});

export const setTheme = createAsyncThunk("global/setTheme", async (theme) => {
  await setAsyncStorage("theme", theme);
  return theme === "light" ? light : dark;
});

const initialState = {
  language: "en",
  theme: light,
  message: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLanguage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLanguage.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.language = action.payload;
      })
      .addCase(getLanguage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.language = "en";
      })
      .addCase(setLanguage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(setLanguage.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.language = action.payload;
      })
      .addCase(setLanguage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.language = "en";
      })
      .addCase(getTheme.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTheme.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.theme = action.payload;
      })
      .addCase(getTheme.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.theme = light;
      })
      .addCase(setTheme.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(setTheme.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.theme = action.payload;
      })
      .addCase(setTheme.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.theme = light;
      });
  },
});

export default globalSlice.reducer;
