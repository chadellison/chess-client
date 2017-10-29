const loggedInReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_LOGGED_IN':
      return action.loggedIn
    default:
      return state
  }
}

export default loggedInReducer
