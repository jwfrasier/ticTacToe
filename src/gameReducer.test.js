import { gameReducer, initialState } from "./gameReducer";

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("reset action works", () => {
  const gameState = {
    ...initialState,
    player: "O",
    currentWinner: "O",
    playerXWins: 12312,
    playerOWins: 234234234
  };

  const nextState = gameReducer(gameState, { type: "reset" });
  expect(nextState).toMatchObject(initialState);
});

test("rematch action works", () => {
  const gameState = {
    ...initialState,
    player: "O",
    currentWinner: "O",
    playerXWins: 12312,
    playerOWins: 234234234
  };

  const nextState = gameReducer(gameState, { type: "rematch" });
  expect(nextState).toMatchObject(
    expect.objectContaining({
      ...initialState,
      playerXWins: gameState.playerXWins,
      playerOWins: gameState.playerOWins
    })
  );
});

test("it does not allow a player to move on an already-moved square", () => {
  let state = { ...initialState };

  // X player move
  state = gameReducer(state, { type: "move", index: 0 });

  // O player move
  state = gameReducer(state, { type: "move", index: 0 });

  // expect that square 0 is still X
  // despite player O trying to click it
  expect(state.boardSquares[0]).toEqual("X");
});
