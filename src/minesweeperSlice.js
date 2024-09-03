// src/minesweeperSlice.js
import { createSlice } from "@reduxjs/toolkit";

const generateInitialBoard = (size, mines) => {
  const board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      revealed: false,
      mine: false,
      mark: "",
    }))
  );
  let placedMines = 0;

  while (placedMines < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (!board[row][col].mine) {
      board[row][col].mine = true;
      placedMines++;
    }
  }

  return board;
};

const initialState = {
  board: generateInitialBoard(10, 20), // Tablero de 10x10 con 20 minas
  gameOver: false,
  score: 0,
};

const minesweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    initializeBoard: (state) => {
      state.board = generateInitialBoard(10, 20);
      state.gameOver = false;
      state.score = 0;
    },
    clickCell: (state, action) => {
      const { rowIndex, cellIndex } = action.payload;
      if (state.board[rowIndex][cellIndex].mine) {
        state.gameOver = true;
        // Revelar todas las minas
        state.board.forEach((row) =>
          row.forEach((cell) => {
            if (cell.mine) cell.revealed = true;
          })
        );
      } else {
        state.board[rowIndex][cellIndex].revealed = true;
        state.board[rowIndex][cellIndex].mark = "X"; // Marcar con una cruz
        state.score += 1; // Incrementar la puntuación
      }
    },
  },
});

export const { initializeBoard, clickCell } = minesweeperSlice.actions;
export default minesweeperSlice.reducer;
