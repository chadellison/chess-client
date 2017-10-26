const loggedInDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LOGGED_IN_DATA':
      return action.logoutData
    default:
      return state
  }
}

export default loggedInDataReducer
