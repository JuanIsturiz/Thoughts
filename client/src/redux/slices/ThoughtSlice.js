import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { thoughtService } from "../services/ThoughtService";

export const getAllThoughts = createAsyncThunk(
  "thought/getAll",
  async (page, thunkAPI) => {
    try {
      return await thoughtService.getAllThoughts(page);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getThoughtsByUser = createAsyncThunk(
  "thought/getByUser",
  async (info, thunkAPI) => {
    try {
      return await thoughtService.getThoughtsByUser(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getThoughtsByEmotion = createAsyncThunk(
  "thought/getByEmotion",
  async (info, thunkAPI) => {
    try {
      return await thoughtService.getThoughtsByEmotion(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getThoughtsByUsername = createAsyncThunk(
  "thought/getByUsername",
  async (info, thunkAPI) => {
    try {
      return await thoughtService.getThoughtsByUsername(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLikedThoughts = createAsyncThunk(
  "thought/getLiked",
  async (info, thunkAPI) => {
    try {
      return await thoughtService.getLikedThoughts(info);
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

export const deleteThought = createAsyncThunk(
  "thought/delete",
  async (id, thunkAPI) => {
    try {
      return await thoughtService.deleteThought(id);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeThought = createAsyncThunk(
  "thought/like",
  async (info, thunkAPI) => {
    try {
      return await thoughtService.likeThought(info);
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
  searchParam: "",
  userThoughts: [],
  searchThoughts: [],
  likedThoughts: [],
  pages: {
    feed: 0,
    user: 0,
    search: 0,
    liked: 0,
  },
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const thoughtSlice = createSlice({
  name: "thoughts",
  initialState,
  reducers: {
    resetThought: (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    setSearchParam: (state, action) => {
      if (action.payload.touchable) {
        state.searchParam = state.searchParam + " " + action.payload.text;
      } else {
        state.searchParam = action.payload.text;
      }
    },
    resetSearchThoughts: (state, action) => {
      state.searchThoughts = [];
      state.pages = { ...state.pages, search: 0 };
    },
    resetLikedThoughts: (state, action) => {
      state.likedThoughts = [];
      state.pages = { ...state.pages, liked: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllThoughts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllThoughts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.thoughts = [...state.thoughts, ...action.payload.thoughts];
        if (!action.payload.end) {
          state.pages = { ...state.pages, feed: state.pages.feed + 1 };
        }
      })
      .addCase(getAllThoughts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getThoughtsByUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getThoughtsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userThoughts = [
          ...state.userThoughts,
          ...action.payload.thoughts,
        ];
        state.pages = { ...state.pages, user: state.pages.user + 1 };
      })
      .addCase(getThoughtsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getThoughtsByEmotion.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getThoughtsByEmotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchThoughts = [
          ...state.searchThoughts,
          ...action.payload.thoughts,
        ];
        state.pages = { ...state.pages, search: state.pages.search + 1 };
      })
      .addCase(getThoughtsByEmotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getThoughtsByUsername.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getThoughtsByUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchThoughts = [
          ...state.searchThoughts,
          ...action.payload.thoughts,
        ];
        state.pages = {
          ...state.pages,
          search: state.pages.search + 1,
        };
      })
      .addCase(getThoughtsByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLikedThoughts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLikedThoughts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.likedThoughts = [
          ...state.likedThoughts,
          ...action.payload.thoughts,
        ];
        state.pages = {
          ...state.pages,
          liked: state.pages.liked + 1,
        };
      })
      .addCase(getLikedThoughts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createThought.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createThought.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.thoughts = [action.payload, ...current(state.thoughts)];
        state.userThoughts = [action.payload, ...current(state.userThoughts)];
      })
      .addCase(createThought.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteThought.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteThought.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.thoughts = current(state.thoughts).filter(
          (thought) => thought._id !== action.payload
        );
        state.userThoughts = current(state.userThoughts).filter(
          (thought) => thought._id !== action.payload
        );
      })
      .addCase(deleteThought.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeThought.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likeThought.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        if (action.payload.action === "like") {
          state.thoughts = current(state.thoughts).map((thought) => {
            if (thought._id === action.payload.id) {
              return {
                ...thought,
                likes: [action.payload.userId, ...thought.likes],
              };
            } else {
              return thought;
            }
          });
        }
        if (action.payload.action === "unlike") {
          state.thoughts = current(state.thoughts).map((thought) => {
            if (thought._id === action.payload.id) {
              return {
                ...thought,
                likes: thought.likes.filter(
                  (id) => id !== action.payload.userId
                ),
              };
            } else {
              return thought;
            }
          });
        }
      })
      .addCase(likeThought.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  resetThought,
  setSearchParam,
  resetSearchThoughts,
  resetLikedThoughts,
} = thoughtSlice.actions;

export default thoughtSlice.reducer;
