const crossedPawnReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_CROSSED_PAWN':
      return action.crossedPawn
    default:
      return state
  }
}

export default crossedPawnReducer
