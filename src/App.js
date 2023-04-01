import { useState, useEffect } from 'react';
import './index.css';

// Tic-tac-toe Project
function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const convert = currentMove % 2 === 0;
  let handlePlay = (arraySquare) => {
    const nextHistory = [...history.slice(0, currentMove + 1), arraySquare];
    console.log(nextHistory);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let discription;
    if (move > 0) {
      discription = "Go to move #" + move;
    } else {
      discription = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{discription}</button>
      </li>
    );
  });
  return (
    <div className="box-shadow">
      <div className="game">
        <div className="game-box">
          <Board
            convert={convert}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <div className="game-info-title">
            <p>History</p>
          </div>
          <ul>{moves}</ul>
        </div>
      </div>
    </div>
  );
}
function Board({ convert, squares, onPlay }) {
  let handleClick = (i) => {
    const arraySquare = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    if (convert) {
      arraySquare[i] = "X";
    } else {
      arraySquare[i] = "O";
    }
    onPlay(arraySquare);
  };
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player " + (convert ? "X" : "O");
  }
  return (
    <div className="board">
      <div className="board-status">
        <p>{status}</p>
      </div>
      <div className="square-board">
        <div className="board-row">
          <Square value={squares[0]} onChangeState={() => handleClick(0)} />
          <Square value={squares[1]} onChangeState={() => handleClick(1)} />
          <Square value={squares[2]} onChangeState={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onChangeState={() => handleClick(3)} />
          <Square value={squares[4]} onChangeState={() => handleClick(4)} />
          <Square value={squares[5]} onChangeState={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onChangeState={() => handleClick(6)} />
          <Square value={squares[7]} onChangeState={() => handleClick(7)} />
          <Square value={squares[8]} onChangeState={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}
function Square({ value, onChangeState }) {
  return (
    <button className="square" onClick={onChangeState}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Game;
