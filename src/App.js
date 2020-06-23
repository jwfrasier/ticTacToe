import React from "react";
import TicTacToe from "./TicTacToe";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 500px 100px;
  grid-template-rows: auto;
  grid-gap: 5px;
  justify-content: center;
  text-align: center;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <TicTacToe />
      </Container>
    </div>
  );
}

export default App;
