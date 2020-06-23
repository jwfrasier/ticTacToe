import React, { useReducer, useMemo } from "react";

function TicTacToe() {
  return (
    <div className="TicTacToe">
      <Board />
    </div>
  );
}

export default TicTacToe;

function Square(props) {
  return (
    <button style={{ height: "36px" }} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const initialState = {
  player: "X",
  currentWinner: null,
  playerXWins: 0,
  playerOWins: 0,

  difficulty: "easy",
  boardSquares: Array(9).fill(null),
  winningLines: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
};

function determineWinner(squares, winningLines, difficulty) {
  // check to see which board is selected, give appropriate solutions

  for (let i = 0; i < winningLines.length; i++) {
    if (difficulty === "easy") {
      const [a, b, c] = winningLines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    } else if (difficulty === "hard") {
      const [a, b, c, d] = winningLines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c] &&
        squares[c] === squares[d]
      ) {
        return squares[a];
      }
    }
  }
  return null;
}

function gameReducer(state, action) {
  let newState = { ...state };

  /**
   * Tests:
   *
   * - test that users cannot make a 'move' after a winner has been announced
   * - test that the player order alternates after a 'move'
   * - test that a player cannot move on an already-filled square
   * - test that rematch works as expected
   * - test that reset works as expected
   *
   * Todo:
   *
   * - style w/ styled components
   * - add more comments explaining logic in reducer perhaps
   */

  switch (action.type) {
    case "move":
      // if there's already a winner, prevent other player from trying to make a move
      if (newState.currentWinner) break;
      // if this square is already filled, short circuit
      else if (state.boardSquares[action.index]) break;

      const newBoardSquares = [...state.boardSquares];
      newBoardSquares[action.index] = state.player === "X" ? "X" : "O";
      newState.boardSquares = newBoardSquares;
      // so if X was playing, O goes next
      newState.player = state.player === "X" ? "O" : "X";
      break;
    case "hard":
      // TODO: scale up number of boardsquares and reset rest of state;

      return {
        ...initialState,
        difficulty: "hard",
        boardSquares: Array(16).fill(null),
        winningLines: [
          [0, 1, 2, 3],
          [3, 4, 5, 6],
          [6, 7, 8, 9],
          [0, 3, 6, 8],
          [0, 5, 10, 15],
          [3, 6, 9, 12],
          [0, 4, 8, 12],
          [1, 5, 9, 13],
          [2, 6, 10, 14],
          [3, 7, 11, 15]
        ], // TODO: figure out winning lines for 16
        playerXWins: state.playerXWins,
        playerOWins: state.playerOWins
      };
    case "easy":
      // TODO: scale down number of boardsquares and reset rest of state;
      return {
        ...initialState,
        difficulty: "easy",
        boardSquares: Array(9).fill(null),
        winningLines: [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ],
        playerXWins: state.playerXWins,
        playerOWins: state.playerOWins
      };
    case "rematch":
      // in case of a rematch, we want to keep the current scores but reset everything else
      return {
        ...initialState,
        playerXWins: state.playerXWins,
        playerOWins: state.playerOWins
      };
    case "reset":
      // in case of a reset, we want to reset everything
      return initialState;
    default:
      break;
  }

  const previousWinner = state.currentWinner;

  if (!previousWinner) {
    const winner = determineWinner(
      newState.boardSquares,
      newState.winningLines,
      newState.difficulty
    );
    newState.currentWinner = winner;

    if (winner === "X") {
      newState.playerXWins = state.playerXWins + 1;
    } else if (winner === "O") {
      newState.playerOWins = state.playerOWins + 1;
    }
  }
  localStorage.setItem("gameState", JSON.stringify(newState));
  return newState;
}

function renderSquareWithReducer(state, dispatch) {
  return function(index) {
    return (
      <Square
        value={state.boardSquares[index]}
        onClick={e => dispatch({ type: "move", index })}
      />
    );
  };
}

function getInitialGameState() {
  try {
    const savedGameState = localStorage.getItem("gameState");
    if (savedGameState) return JSON.parse(savedGameState);
  } catch (error) {
    console.error(error);
  }

  return initialState;
}

const initialGameState = getInitialGameState();

function Board() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const title = useMemo(() => {
    return state.currentWinner
      ? `Winner is: ${state.currentWinner}`
      : `Next Player: ${state.player}`;
  }, [state.currentWinner, state.player]);

  const renderSquare = renderSquareWithReducer(state, dispatch);

  return (
    <div>
      <div>{title}</div>
      <div>O Wins: {state.playerOWins}</div>
      <div>X Wins: {state.playerXWins}</div>
      <div>
        <button onClick={() => dispatch({ type: "rematch" })}>Rematch</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button onClick={() => dispatch({ type: "easy" })}>
          Easy Mode (3x3)
        </button>
        <button onClick={() => dispatch({ type: "hard" })}>
          Hard Mode (4x4)
        </button>
      </div>
      {state.difficulty === "easy" && (
        <div>
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
      )}
      {state.difficulty === "hard" && (
        <div>
          <div>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
          </div>
          <div>
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
          </div>
          <div>
            {renderSquare(8)}
            {renderSquare(9)}
            {renderSquare(10)}
            {renderSquare(11)}
          </div>
          <div>
            {renderSquare(12)}
            {renderSquare(13)}
            {renderSquare(14)}
            {renderSquare(15)}
          </div>
        </div>
      )}
    </div>
  );
}

//
