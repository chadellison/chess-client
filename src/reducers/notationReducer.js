const notationReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_NOTATION':
      return action.notation
    default:
      return state
  }
}

export default notationReducer
