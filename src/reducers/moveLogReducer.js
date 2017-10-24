const moveLogReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_MOVE_LOG_ACTIVE':
      return action.moveLogActive
    default:
      return state
  }
}

export default moveLogReducer
