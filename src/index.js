import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function isWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isDraw(squares) {
  for (let i = 0; i < squares.length; i++) {
    if ((squares[i] === null)) return false;
  }
  return true;
}

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [isXNext, setIsXNext] = useState(true);

  const winner = isWinner(squares);
  const draw = isDraw(squares)

  function renderSquare(index) {
    return (
      <Square
        value={squares[index]}
        onClick={function() {
          //represent the future state of the app. We are copying the array
          const nextSquares = squares.slice();

          nextSquares[index] = isXNext ? "X" : "O";

          //this is a re-render
          setSquares(nextSquares);
          setIsXNext(!isXNext);
        }}
      />
    );
  }

  function getStatus(winner, full) {
    if (winner) {
        return "Winner! " + winner;
    }
    if (full){
        return "Draw!"
    }

    return isXNext ? "X's Turn" : "O's Turn";
  }

  console.log(getStatus(winner, draw));

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
  <div>{getStatus(winner, draw)}</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));
