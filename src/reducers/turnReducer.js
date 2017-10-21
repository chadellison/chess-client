const turnReducer = (state = 'white', action) => {
  switch (action.type) {
    case 'GET_TURN':
      return action.turn
    default:
      return state
  }
}

export default turnReducer
