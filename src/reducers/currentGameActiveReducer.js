const currentGameActiveReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_CURRENT_GAME_ACTIVE':
      return action.currentGameActive
    default:
      return state
  }
}

export default currentGameActiveReducer
