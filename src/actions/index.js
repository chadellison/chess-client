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

export const getLogout = (logoutData) => {
  return { type: 'GET_LOGOUT', logoutData: logoutData }
}

export const getMessageToUser = (message) => {
  return { type: 'GET_MESSAGE_TO_USER', messageToUser: message }
}

export const getHashedEmail = (hashedEmail) => {
  return { type: 'GET_HASHED_EMAIL', hashedEmail: hashedEmail }
}

export const getLoading = (loading) => {
  return { type: 'GET_LOADING', loading: loading }
}
