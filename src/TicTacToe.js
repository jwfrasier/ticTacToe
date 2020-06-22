import React, { useState } from "react";

function TicTacToe() {
  return (
    <div className="TicTacToe">
      <Board />
    </div>
  );
}

export default TicTacToe;

// container
// value (prop)
// onClick function (prop)
function Square(props) {
  return <button onClick={props.onClick}>{props.value}</button>;
}

// board
function Board() {
  // state
  //board state
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  // turn state
  const [xIsNext, setXIsNext] = useState(true);
  // handleclick
  const handleClick = index => {
    // copy of our board state
    const newBoardSquares = [...boardSquares];
    // if the index of the board is filled, return
    if (determineWinner(boardSquares) || newBoardSquares[index]) return;
    // mutate the copy, and add x or o
    newBoardSquares[index] = xIsNext ? "X" : "O";
    //calc next turn

    // set the state of the board
    setBoardSquares(newBoardSquares);
    // set the state of the next turn
    setXIsNext(!xIsNext);
  };

  // create our board

  // create a render square function
  const renderSquare = index => {
    return (
      <Square value={boardSquares[index]} onClick={() => handleClick(index)} />
    );
  };
  // take in an index
  // return a square, with the correct value and function
  // initialize status
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
// function to calc winner
function determineWinner(squares) {
  // get our set of winning lines
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
  // loop through set
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
  // check if values in our squares array are winning lines
  //if so, return X or O
  // else return nothing
}
