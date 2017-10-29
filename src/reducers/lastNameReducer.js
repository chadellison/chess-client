const lastNameReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_LAST_NAME':
      return action.lastName
    default:
      return state
  }
}

export default lastNameReducer
