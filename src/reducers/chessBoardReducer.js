const chessBoardReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CHESSBOARD':
      return action.chessBoard
    default:
      return state
  }
}

export default chessBoardReducer
