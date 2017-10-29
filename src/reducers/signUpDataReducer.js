const signUpDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SIGN_UP_DATA':
      return action.signUpData
    default:
      return state
  }
}

export default signUpDataReducer
