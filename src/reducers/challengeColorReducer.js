const challengeColorReducer = (state = 'white', action) => {
  switch (action.type) {
    case 'GET_CHALLENGE_COLOR':
      return action.challengeColor
    default:
      return state
  }
}

export default challengeColorReducer
