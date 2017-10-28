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
import challengePlayerReducer from './challengePlayerReducer'
import challengeRobotReducer from './challengeRobotReducer'
import challengedNameReducer from './challengedNameReducer'
import challengedEmailReducer from './challengedEmailReducer'
import challengeColorReducer from './challengeColorReducer'
import emailReducer from './emailReducer'
import passwordReducer from './passwordReducer'
import signUpDataReducer from './signUpDataReducer'
import signUpFormActiveReducer from './signUpFormActiveReducer'
import signInFormActiveReducer from './signInFormActiveReducer'
import firstNameReducer from './firstNameReducer'
import lastNameReducer from './lastNameReducer'
import tokenReducer from './tokenReducer'
import loggedInReducer from './loggedInReducer'
import userGamesReducer from './userGamesReducer'
import thumbnailsReducer from './thumbnailsReducer'
import myGamesActiveReducer from './myGamesActiveReducer'

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
  challengePlayer: challengePlayerReducer,
  challengeRobot: challengeRobotReducer,
  challengedName: challengedNameReducer,
  challengedEmail: challengedEmailReducer,
  challengeColor: challengeColorReducer,
  email: emailReducer,
  password: passwordReducer,
  signUpData: signUpDataReducer,
  signUpFormActive: signUpFormActiveReducer,
  signInFormActive: signInFormActiveReducer,
  firstName: firstNameReducer,
  lastName: lastNameReducer,
  token: tokenReducer,
  loggedIn: loggedInReducer,
  userGames: userGamesReducer,
  thumbnails: thumbnailsReducer,
  myGamesActive: myGamesActiveReducer
})

export default rootReducer
