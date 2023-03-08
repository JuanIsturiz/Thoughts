import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import thoughtReducer from "./slices/ThoughtSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thought: thoughtReducer,
  },
});
