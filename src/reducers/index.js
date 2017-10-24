import { combineReducers } from 'redux'
import turnReducer from './turnReducer'
import chessBoardReducer from './chessBoardReducer'
import previousBoardReducer from './previousBoardReducer'
import selectedReducer from './selectedReducer'
import moveLogReducer from './moveLogReducer'
import logoutReducer from './logoutReducer'

const rootReducer = combineReducers({
  turn: turnReducer,
  chessBoard: chessBoardReducer,
  previousBoard: previousBoardReducer,
  selected: selectedReducer,
  moveLogActive: moveLogReducer,
  logoutData: logoutReducer
})

export default rootReducer
