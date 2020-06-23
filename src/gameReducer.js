export const initialState = {
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

export const initialGameState = getInitialGameState();

export function determineWinner(squares, winningLines, difficulty) {
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

export function getInitialGameState() {
  try {
    const savedGameState = localStorage.getItem("gameState");
    if (savedGameState) return JSON.parse(savedGameState);
  } catch (error) {
    console.error(error);
  }

  return initialState;
}

export function gameReducer(state, action) {
  let newState = { ...state };

  switch (action.type) {
    // case for what constitutes a 'move' for a player
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
        ],
        playerXWins: state.playerXWins,
        playerOWins: state.playerOWins
      };
    case "easy":
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
