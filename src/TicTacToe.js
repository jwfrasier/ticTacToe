import React, { useReducer, useMemo } from "react";
import { gameReducer, initialGameState } from "./gameReducer";

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
