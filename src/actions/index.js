export const getTurn = (turn) => {
  return { type: 'GET_TURN', turn: turn === 'white' ? 'black' : 'white' };
};

export const getChessBoard = (chessBoard) => {
  return { type: 'GET_CHESSBOARD', chessBoard: chessBoard }
}
