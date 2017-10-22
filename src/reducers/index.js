import { combineReducers } from 'redux'
import turnReducer from './turnReducer'
import chessBoardReducer from './chessBoardReducer'
import previousBoardReducer from './previousBoardReducer'
import selectedReducer from './selectedReducer'

const rootReducer = combineReducers({
  turn: turnReducer,
  chessBoard: chessBoardReducer,
  previousBoard: previousBoardReducer,
  selected: selectedReducer
})

export default rootReducer
