const thumbnailsReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_THUMBNAILS':
      return action.thumbnails
    default:
      return state
  }
}

export default thumbnailsReducer
