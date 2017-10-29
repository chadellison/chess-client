const previousBoardReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_PREVIOUS_BOARD':
      return action.previousBoard
    default:
      return state
  }
}

export default previousBoardReducer
