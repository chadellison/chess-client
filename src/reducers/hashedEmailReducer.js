const hashedEmailReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_HASHED_EMAIL':
      return action.hashedEmail
    default:
      return state
  }
}

export default hashedEmailReducer
