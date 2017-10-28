const movesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_MOVES':
      return action.moves
    default:
      return state
  }
}

export default movesReducer
