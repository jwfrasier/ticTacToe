import React, { useReducer, useMemo } from "react";
import { gameReducer, initialGameState } from "./gameReducer";
import styled from "styled-components";

export const Row = styled.div`
  height: 64px;
  display: flex;
`;

export const Button = styled.button`
  height: 64px;
  width: 64px;
  font-size: 10px;
  appearance: none;
  background: transparent;
  border: 1px solid gray;
  padding: 0;
  margin: 0;
  text-decoration: none;

  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: black;
  }
`;

export const TitleContainer = styled.div`
  grid-column: 2/2;
`;

export const ButtonContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  grid-column: 2/2;
  grid-row: 2/2;
`;

export const TicTacToeContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  grid-column: 2/3;
  grid-row: 3/8;
`;

function TicTacToe() {
  return <Board />;
}

export default TicTacToe;

function Square(props) {
  return (
    <Button style={{ fontSize: "24px" }} onClick={props.onClick}>
      {props.value || " "}
    </Button>
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
    <React.Fragment>
      <TitleContainer className="titleContainer">
        <div className="title">{title}</div>
        <div className="Owins">O Wins: {state.playerOWins}</div>
        <div className="Xwins">X Wins: {state.playerXWins}</div>
      </TitleContainer>

      <ButtonContainer className="ButtonContainer">
        <Row>
          <Button
            className="headerbutton"
            onClick={() => dispatch({ type: "rematch" })}
          >
            Rematch
          </Button>
          <Button
            className="headerbutton"
            onClick={() => dispatch({ type: "reset" })}
          >
            Reset
          </Button>
          <Button
            className="headerbutton"
            onClick={() => dispatch({ type: "easy" })}
          >
            Easy Mode (3x3)
          </Button>
          <Button
            className="headerbutton"
            onClick={() => dispatch({ type: "hard" })}
          >
            Hard Mode (4x4)
          </Button>
        </Row>
      </ButtonContainer>
      {state.difficulty === "easy" && (
        <TicTacToeContainer className="tictactoeccontainer">
          <Row>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </Row>

          <Row>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </Row>
          <Row>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </Row>
        </TicTacToeContainer>
      )}
      {state.difficulty === "hard" && (
        <TicTacToeContainer className="tictactoeccontainer">
          <Row>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
          </Row>
          <Row>
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
          </Row>
          <Row>
            {renderSquare(8)}
            {renderSquare(9)}
            {renderSquare(10)}
            {renderSquare(11)}
          </Row>
          <Row>
            {renderSquare(12)}
            {renderSquare(13)}
            {renderSquare(14)}
            {renderSquare(15)}
          </Row>
        </TicTacToeContainer>
      )}
    </React.Fragment>
  );
}
