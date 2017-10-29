const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return action.token
    default:
      return state
  }
}

export default tokenReducer
