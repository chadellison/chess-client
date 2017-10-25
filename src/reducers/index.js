import { combineReducers } from 'redux'
import turnReducer from './turnReducer'
import chessBoardReducer from './chessBoardReducer'
import previousBoardReducer from './previousBoardReducer'
import selectedReducer from './selectedReducer'
import moveLogReducer from './moveLogReducer'
import logoutReducer from './logoutReducer'
import messageToUserReducer from './messageToUserReducer'
import hashedEmailReducer from './hashedEmailReducer'
import loadingReducer from './loadingReducer'
import challengePlayer from './challengePlayerReducer'

const rootReducer = combineReducers({
  turn: turnReducer,
  chessBoard: chessBoardReducer,
  previousBoard: previousBoardReducer,
  selected: selectedReducer,
  moveLogActive: moveLogReducer,
  logoutData: logoutReducer,
  messageToUser: messageToUserReducer,
  hashedEmail: hashedEmailReducer,
  loading: loadingReducer,
  challengePlayer: challengePlayer
})

export default rootReducer
