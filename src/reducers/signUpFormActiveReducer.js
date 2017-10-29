const signUpFormActiveReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_SIGN_UP_FORM_ACTIVE':
      return action.signUpFormActive
    default:
      return state
  }
}

export default signUpFormActiveReducer
