const selectedReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_SELECTED':
      return action.selected
    default:
      return state
  }
}

export default selectedReducer
