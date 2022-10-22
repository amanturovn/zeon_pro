import React, { useEffect, useState } from "react";
const Matrix = () => {
  const matrix = () => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  //! проверка ячеек
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
  //! проверка массива
  // const arrayСheck = board => {
  //   return !arrayСheckValue(board, 0);
  // };
  // const asdasd = board => {
  //   let row = Math.floor(Math.random() * 4);
  //   let col = Math.floor(Math.random() * 4);
  //   board[row][col] = 4;
  //   // return board;
  // };
  // asdasd(matrix());

  const generateRandom = board => {
    //!проверка массива,  возвращаем доску, если клетки больше нет
    if (!arrayСheckValue(board, 0)) {
      console.log(board);
      return board;
    }
    // if (arrayСheck(board)) {
    //   console.log("over");
    //   return board;
    // }

    //! случайным образом выбирать ячейку, пока эта ячейка не станет пустой
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);

    for (let i = 0; i < board.length; i++) {
      let everyArr = board[i];
      let aasd = everyArr.every(elem => elem === 0);
      if (aasd) {
        board[col][row] =
          (Math.random() > 1 && 2) || Math.random() > 0.1 ? 2 : 4;
      }

      while (board[row][col] !== 0) {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
      }
      board[row][col] = 2;
      return board;
    }
  };

  // generateRandom(board);

  //!
  const compressLine = board => {
    const newBoard = matrix();
    for (let i = 0; i < board.length; i++) {
      let colIndex = 0;
      for (let j = 0; j < board[i].length; j++) {
        //! перемещать только все значения > 0 влево
        if (board[i][j] !== 0) {
          newBoard[i][colIndex] = board[i][j];
          colIndex++;
        }
      }
    }
    return newBoard;
  };
  //! Объединитm ячейки с одинаковым значением
  const [check, setCheck] = useState(0);
  const [checkWin, setCheckWin] = useState("");
  // const [winCheck, setWinCheck] = useState(checkWin);
  // console.log(checkWin);
  // const you__win = document.querySelector(".you__win");
  let [winCheck, setWinCheck] = useState(16);
  let [addRemClass, setAddRemClass] = useState(false);

  // console.log(winCheck);
  const connectСell = board => {
    let checkMerge = check;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
          board[i][j] = board[i][j] * 2;
          if (board[i][j] == winCheck) {
            setCheckWin("You Win!");
            // you__win.classList.remove("hide");
            // onKeyDown = isDisabled;
            setAddRemClass(true);
            // winCheck = winCheck * 2;
            setWinCheck(winCheck * 2);
          }
          board[i][j + 1] = 0;
          checkMerge += board[i][j];
        }
      }
    }
    setCheck(checkMerge);
    return board;
  };

  const reverseLine = board => {
    const reverseBoard = matrix();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        //!  переворачиваем каждую строку.
        reverseBoard[i][j] = board[i][board[i].length - 1 - j];
      }
    }
    return reverseBoard;
  };

  //! Повернуть на -90 градусов
  const rotateLeft = board => {
    const rotateBoard = matrix();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        rotateBoard[i][j] = board[j][board[i].length - 1 - i];
      }
    }
    return rotateBoard;
  };
  //! Повернуть на -90 градусов
  const rotateRight = board => {
    const rotateBoard = matrix();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        rotateBoard[i][j] = board[board[i].length - 1 - j][i];
      }
    }
    return rotateBoard;
  };

  const moveLeft = board => {
    const newBoard1 = compressLine(board);
    const newBoard2 = connectСell(newBoard1);
    return compressLine(newBoard2);
  };

  const moveRight = board => {
    const reversedBoard = reverseLine(board);
    const newBoard = moveLeft(reversedBoard);
    return reverseLine(newBoard);
  };

  const moveUp = board => {
    const rotateBoard = rotateLeft(board);
    const newBoard = moveLeft(rotateBoard);
    return rotateRight(newBoard);
  };
  const moveDown = board => {
    const rotateBoard = rotateRight(board);
    const newBoard = moveLeft(rotateBoard);
    return rotateLeft(newBoard);
  };

  const [board, setMatstate] = useState(generateRandom(matrix()));

  const onKeyDown = e => {
    switch (e.key) {
      case "ArrowLeft":
        const newBoard = moveLeft(board);
        setMatstate(generateRandom(newBoard));
        break;
      case "ArrowRight":
        const newBoard2 = moveRight(board);
        setMatstate(generateRandom(newBoard2));
        break;
      case "ArrowUp":
        const newBoard3 = moveUp(board);
        setMatstate(generateRandom(newBoard3));
        break;
      case "ArrowDown":
        const newBoard4 = moveDown(board);
        setMatstate(generateRandom(newBoard4));
        break;
    }
  };
  const [bestScore, setBestScore] = useState(localStorage.getItem("bestscore"));
  useEffect(() => {
    if (!localStorage.setItem("bestscore", bestScore)) {
      localStorage.setItem("bestscore", bestScore);
    }
    if (check > bestScore) {
      setBestScore(check);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  // const [hide,setHide]=useState(false)
  const restart = () => {
    setCheck(0);
    setMatstate(generateRandom(matrix()));
    setAddRemClass(false);
    // you__win.classList.add("hide");
  };

  // const continueGame = () => {
  //   // let continueBtn = document.querySelector(".continue");
  //   // you__win.classList.add("hide");
  //   // winCheck += winCheck * 2;
  //   setAddRemClass(false);
  // };

  return (
    <>
      <div className="container wrap">
        <div className="header">
          <h1>2048</h1>
          <div className="header__chek">
            <p>SCORE</p>
            <div>{check}</div>
          </div>
          <div className="header__chek">
            <p>BEST</p>
            <div>{bestScore}</div>
          </div>
          <div className="header__chek restart">
            <div id="restart__btn" onClick={() => restart()}>
              RESTART
            </div>
          </div>
        </div>
        <div className={addRemClass ? "you__win" : "hide"}>
          <div>
            <h2>{checkWin}</h2>
            <button onClick={() => setAddRemClass(false)} className="continue">
              CONTINUE
            </button>
          </div>
        </div>
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
        </div>
      </div>
    </>
  );
};

export default Matrix;
