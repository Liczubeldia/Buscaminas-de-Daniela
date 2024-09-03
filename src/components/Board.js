// src/components/Board.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBoard, clickCell } from "../minesweeperSlice";

const Board = () => {
  const board = useSelector((state) => state.minesweeper.board);
  const gameOver = useSelector((state) => state.minesweeper.gameOver);
  const score = useSelector((state) => state.minesweeper.score);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initializeBoard());
  }, [dispatch]);

  const handleClick = (rowIndex, cellIndex) => {
    if (!gameOver) {
      dispatch(clickCell({ rowIndex, cellIndex }));
    }
  };

  return (
    <div className="container">
      <div className="score">Puntuación: {score}</div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <button
              key={`${rowIndex}-${cellIndex}`}
              onClick={() => handleClick(rowIndex, cellIndex)}
              className={`${cell.revealed ? "revealed" : ""} ${
                cell.revealed && cell.mine ? "mine" : ""
              }`}
              disabled={cell.revealed}
            >
              {cell.revealed ? (cell.mine ? "💥" : "X") : ""}
            </button>
          ))
        )}
      </div>
      {gameOver && <div className="game-over">Game Over!</div>}
      <h6>
        El juego termina al clickear alguna de las 20 minas ocultas en el
        tablero
      </h6>
    </div>
  );
};

export default Board;
