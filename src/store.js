//store.js
import { configureStore } from "@reduxjs/toolkit";
import minesweeperReducer from "./minesweeperSlice";

export const store = configureStore({
  reducer: {
    minesweeper: minesweeperReducer,
  },
});
