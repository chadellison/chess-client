const challengedEmailReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_CHALLENGED_EMAIL':
      return action.challengedEmail
    default:
      return state
  }
}

export default challengedEmailReducer
