const myGamesActiveReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_MY_GAMES_ACTIVE':
      return action.myGamesActive
    default:
      return state
  }
}

export default myGamesActiveReducer
