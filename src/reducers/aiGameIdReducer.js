const aiGameIdReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_AI_GAME_ID':
      return action.aiGameId
    default:
      return state
  }
}

export default aiGameIdReducer
