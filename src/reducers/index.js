import { combineReducers } from 'redux'
import turnReducer from './turnReducer'
import chessBoardReducer from './chessBoardReducer'
import previousBoardReducer from './previousBoardReducer'
import selectedReducer from './selectedReducer'
import moveLogReducer from './moveLogReducer'
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
import signUpFormActiveReducer from './signUpFormActiveReducer'
import signInFormActiveReducer from './signInFormActiveReducer'
import firstNameReducer from './firstNameReducer'
import lastNameReducer from './lastNameReducer'
import tokenReducer from './tokenReducer'
import loggedInReducer from './loggedInReducer'
import userGamesReducer from './userGamesReducer'
import thumbnailsReducer from './thumbnailsReducer'
import myGamesActiveReducer from './myGamesActiveReducer'
import playerColorReducer from './playerColorReducer'
import currentGameActiveReducer from './currentGameActiveReducer'
import currentGameReducer from './currentGameReducer'
import movesReducer from './movesReducer'
import checkmateReducer from './checkmateReducer'
import crossedPawnReducer from './crossedPawnReducer'
import stalemateReducer from './stalemateReducer'
import pageReducer from './pageReducer'
import analyticsChartActiveReducer from './analyticsChartActiveReducer'
import chartDataReducer from './chartDataReducer'
import aiGameIdReducer from './aiGameIdReducer'

const rootReducer = combineReducers({
  turn: turnReducer,
  chessBoard: chessBoardReducer,
  previousBoard: previousBoardReducer,
  selected: selectedReducer,
  moveLogActive: moveLogReducer,
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
  signUpFormActive: signUpFormActiveReducer,
  signInFormActive: signInFormActiveReducer,
  firstName: firstNameReducer,
  lastName: lastNameReducer,
  token: tokenReducer,
  loggedIn: loggedInReducer,
  userGames: userGamesReducer,
  thumbnails: thumbnailsReducer,
  myGamesActive: myGamesActiveReducer,
  playerColor: playerColorReducer,
  currentGameActive: currentGameActiveReducer,
  currentGame: currentGameReducer,
  moves: movesReducer,
  checkmate: checkmateReducer,
  crossedPawn: crossedPawnReducer,
  stalemate: stalemateReducer,
  page: pageReducer,
  analyticsChartActive: analyticsChartActiveReducer,
  chartData: chartDataReducer,
  aiGameId: aiGameIdReducer
})

export default rootReducer
