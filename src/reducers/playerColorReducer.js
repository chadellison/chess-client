const playerColorReducer = (state = 'white', action) => {
  switch (action.type) {
    case 'GET_PLAYER_COLOR':
      return action.playerColor
    default:
      return state
  }
}

export default playerColorReducer
