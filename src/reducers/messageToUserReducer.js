const messageToUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_MESSAGE_TO_USER':
      return action.messageToUser
    default:
      return state
  }
}

export default messageToUserReducer
