const signInFormActiveReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_SIGN_IN_FORM_ACTIVE':
      return action.signInFormActive
    default:
      return state
  }
}

export default signInFormActiveReducer
