const challengedNameReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_CHALLENGED_NAME':
      return action.challengedName
    default:
      return state
  }
}

export default challengedNameReducer
