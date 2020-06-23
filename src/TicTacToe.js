import React, { useState } from "react";

function TicTacToe() {
  return (
    <div className="TicTacToe">
      <Board />
    </div>
  );
}

export default TicTacToe;

function Square(props) {
  return <button onClick={props.onClick}>{props.value}</button>;
}

function Board() {
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = index => {
    const newBoardSquares = [...boardSquares];

    if (determineWinner(boardSquares) || newBoardSquares[index]) return;

    newBoardSquares[index] = xIsNext ? "X" : "O";

    setBoardSquares(newBoardSquares);

    setXIsNext(!xIsNext);
  };

  const renderSquare = index => {
    return (
      <Square value={boardSquares[index]} onClick={() => handleClick(index)} />
    );
  };

  let status;
  const winner = determineWinner(boardSquares);

  status = winner
    ? `Winner is: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;
  return (
    <div>
      <div>{status}</div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function determineWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
