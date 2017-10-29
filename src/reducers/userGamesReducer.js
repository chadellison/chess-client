const userGamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_GAMES':
      return action.userGames
    default:
      return state
  }
}

export default userGamesReducer
