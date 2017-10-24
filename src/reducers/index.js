import { combineReducers } from 'redux'
import turnReducer from './turnReducer'
import chessBoardReducer from './chessBoardReducer'
import previousBoardReducer from './previousBoardReducer'
import selectedReducer from './selectedReducer'
import moveLogReducer from './moveLogReducer'
import logoutReducer from './logoutReducer'
import messageToUserReducer from './messageToUserReducer'

const rootReducer = combineReducers({
  turn: turnReducer,
  chessBoard: chessBoardReducer,
  previousBoard: previousBoardReducer,
  selected: selectedReducer,
  moveLogActive: moveLogReducer,
  logoutData: logoutReducer,
  messageToUser: messageToUserReducer
})

export default rootReducer
