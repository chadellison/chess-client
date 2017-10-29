const challengeRobotReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_CHALLENGE_ROBOT':
      return action.challengeRobot
    default:
      return state
  }
}

export default challengeRobotReducer
