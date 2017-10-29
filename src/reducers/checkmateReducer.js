const checkmateReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_CHECKMATE':
      return action.checkmate
    default:
      return state
  }
}

export default checkmateReducer
