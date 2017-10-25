const challengePlayerReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_CHALLENGE_PLAYER':
      return action.challengePlayer
    default:
      return state
  }
}

export default challengePlayerReducer
