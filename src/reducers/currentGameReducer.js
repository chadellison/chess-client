const currentGameReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_CURRENT_GAME':
      return action.currentGame
    default:
      return state
  }
}

export default currentGameReducer
