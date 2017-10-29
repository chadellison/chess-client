const stalemateReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_STALEMATE':
      return action.stalemate
    default:
      return state
  }
}

export default stalemateReducer
