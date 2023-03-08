import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { thoughtService } from "../services/ThoughtService";

export const getAllThoughts = createAsyncThunk(
  "thought/getAll",
  async (_, thunkAPI) => {
    try {
      return await thoughtService.getAllThoughts();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createThought = createAsyncThunk(
  "thought/create",
  async (info, thunkAPI) => {
    try {
      return await thoughtService.createThought(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  thoughts: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const thoughtSlice = createSlice({
  name: "thoughts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createThought.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createThought.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        current(state.thoughts).push(action.payload);
      })
      .addCase(createThought.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default thoughtSlice.reducer;
