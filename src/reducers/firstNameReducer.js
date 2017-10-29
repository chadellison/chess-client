const firstNameReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_FIRST_NAME':
      return action.firstName
    default:
      return state
  }
}

export default firstNameReducer
