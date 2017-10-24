const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LOGOUT':
      return action.logoutData
    default:
      return state
  }
}

export default logoutReducer
