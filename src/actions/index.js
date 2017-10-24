export const getTurn = (turn) => {
  return { type: 'GET_TURN', turn: turn === 'white' ? 'black' : 'white' };
};

export const getChessBoard = (chessBoard) => {
  return { type: 'GET_CHESSBOARD', chessBoard: chessBoard }
}

export const getPreviousBoard = (board) => {
  return { type: 'GET_PREVIOUS_BOARD', previousBoard: board }
}

export const getSelected = (selected) => {
  return { type: 'GET_SELECTED', selected: selected }
}

export const getMoveLogActive = (moveLogActive) => {
  return { type: 'GET_MOVE_LOG_ACTIVE', moveLogActive: moveLogActive }
}
