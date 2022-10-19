import React, { useEffect, useState } from "react";

const Matrix = () => {
  const matrix = () => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const arrayСheckValue = (board, value) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === value) {
          return true;
        }
      }
    }
    return false;
  };

  const arrayСheckFull = board => {
    return !arrayСheckValue(board, 0);
  };

  const getRandomPosition = () => {
    const rowPosition = Math.floor(Math.random() * 4);
    const colPosition = Math.floor(Math.random() * 4);
    // console.log(rowPosition,colPosition)
    return [rowPosition, colPosition];
  };

  const generateRandom = board => {
    if (arrayСheckFull(board)) {
      return board;
    }

    let [row, col] = getRandomPosition();

    // while(i !== 0){
    // }
    while (board[row][col] !== 0) {
      [row, col] = getRandomPosition();
    }
    board[row][col] = 2;
    return board;
  };

  const moveMatrix = board => {
    const newBoard = matrix();
    for (let i = 0; i < board.length; i++) {
      let colIndex = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          newBoard[i][colIndex] = board[i][j];
          colIndex++;
        }
      }
    }
    return newBoard;
  };

  const mergeValue = board => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j + 1] = 0;
        }
      }
    }

    return board;
  };

  const moveLeft = board => {
    const newBoard1 = moveMatrix(board);
    const newBoard2 = mergeValue(newBoard1);
    return moveMatrix(newBoard2);
  };

  //! ============================

  const left = () => {
    const newBoard = moveLeft(board);
    setMatstate(generateRandom(newBoard));
  };

  const onKeyDown = e => {
    switch (e.key) {
      case "ArrowLeft":
        left();
    }
  };
  const [board, setMatstate] = useState(generateRandom(matrix()));

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <>
      <div className="square">
        {board.map((row, i) => {
          return (
            <div key={`row-${i}`} className="row">
              {row.map((cell, j) => (
                <div key={`cell-${i}-${j}`} className={`cell cell-${cell}`}>
                  {cell > 0 ? cell : ""}
                </div>
              ))}
            </div>
          );
        })}
        <button className="btn">left</button>
      </div>
    </>
  );
};

export default Matrix;
