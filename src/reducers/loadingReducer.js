const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case 'GET_LOADING':
      return action.loading
    default:
      return state
  }
}

export default loadingReducer
