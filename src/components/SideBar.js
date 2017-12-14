import React, { Component } from 'react'
import '../styles/SideBar.css'
import jsonChessBoard from '../jsonChessBoard'
import MoveLog from './MoveLog'
import CredentialForm from './CredentialForm'
import Loader from './Loader'
import GameService from '../services/GameService'
import Analytics from './Analytics'
import GamePlayButton from './GamePlayButton'
import ChallengeForm from './ChallengeForm'
import { connect } from 'react-redux'
import {
  getMoveLogActive,
  getChallengePlayer,
  getChallengeColor,
  getMessageToUser,
  getSignInFormActive,
  getSignUpFormActive,
  getToken,
  getHashedEmail,
  getMyGamesActive,
  getThumbnails,
  getTurn,
  getPlayerColor,
  getCurrentGameActive,
  getCurrentGame,
  getChessBoard,
  getMoves,
  getLoggedIn,
  getPreviousBoard,
  getCheckmate,
  getStalemate,
  getCrossedPawn,
  getSelected,
  getLoading,
  getEmail,
  getPassword,
  getFirstName,
  getLastName,
  getUserGames,
  getAnalyticsChartActive,
  getChartData,
  setAiGameId
} from '../actions/index'

class SideBar extends Component {
  constructor() {
    super()
    this.gameService = new GameService()

    this.handleMoveLog        = this.handleMoveLog.bind(this)
    this.handleLogout         = this.handleLogout.bind(this)
    this.handleCredentialForm = this.handleCredentialForm.bind(this)
    this.handleMyGamesActive  = this.handleMyGamesActive.bind(this)
    this.handleReset          = this.handleReset.bind(this)
    this.updateSignInInfo     = this.updateSignInInfo.bind(this)
    this.handleAnalyticsChart = this.handleAnalyticsChart.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getChessBoard(jsonChessBoard))
    if (localStorage.getItem('state')) {
      let currentState = JSON.parse(localStorage.getItem('state'))

      this.gameService.fetchGames(currentState.token, 1)
        .then(response => response.json())
        .then(responseJson => {
          currentState.userGames = responseJson.data
          this.props.dispatch(getLoading(false))
          this.updateSignInInfo(currentState)
        })
        .catch((error) => {
          localStorage.removeItem('state')
          this.props.dispatch(getLoading(false))
        })
    } else {
      this.props.dispatch(getLoading(false))
    }
  }

  updateSignInInfo(userData) {
    this.props.dispatch(getToken(userData.token))
    this.props.dispatch(getSignUpFormActive(false))
    this.props.dispatch(getSignInFormActive(false))
    this.props.dispatch(getLoggedIn(true))
    this.props.dispatch(getMessageToUser('Welcome to Chess Mail!'))
    this.props.dispatch(getHashedEmail(userData.hashedEmail))
    this.props.dispatch(getEmail(''))
    this.props.dispatch(getPassword(''))
    this.props.dispatch(getFirstName(userData.firstName))
    this.props.dispatch(getLastName(userData.lastName))
    this.props.dispatch(getUserGames(userData.userGames))
    this.props.dispatch(getThumbnails(true))
    this.props.dispatch(getMyGamesActive(true))
    this.props.dispatch(getLoading(false))
    this.props.dispatch(getAnalyticsChartActive(false))
  }

  handleCredentialForm(event) {
    if(event.target.textContent === 'Sign Up') {
      this.props.dispatch(getSignUpFormActive(true))
    }
    if(event.target.textContent === 'Sign In') {
      this.props.dispatch(getSignInFormActive(true))
    }
    this.props.dispatch(getAnalyticsChartActive(false))
  }

  handleMoveLog() {
    this.props.dispatch(getMoveLogActive(!this.props.moveLogActive))
  }

  handleLogout() {
    this.props.dispatch(getToken(''))
    this.props.dispatch(getLoggedIn(false))
    this.props.dispatch(getHashedEmail(''))
    this.props.dispatch(getMessageToUser('successfully logged out'))
    this.props.dispatch(getChallengePlayer(false))
    this.props.dispatch(getMyGamesActive(false))
    this.props.dispatch(getThumbnails(false))
    this.props.dispatch(getTurn('white'))
    this.props.dispatch(getPlayerColor('white'))
    this.props.dispatch(getChallengeColor('white'))
    this.props.dispatch(getCurrentGameActive(false))
    this.props.dispatch(getCurrentGame(null))
    this.props.dispatch(getChessBoard(JSON.parse(JSON.stringify(jsonChessBoard))))
    this.props.dispatch(getMoves([]))
    this.props.dispatch(getMoveLogActive(false))
    this.props.dispatch(getAnalyticsChartActive(false))

    localStorage.removeItem('state')
  }

  handleMyGamesActive() {
    this.props.dispatch(getMessageToUser(''))
    this.props.dispatch(getMyGamesActive(!this.props.myGamesActive))
    this.props.dispatch(getThumbnails(!this.props.thumbnails))
    this.props.dispatch(getCurrentGameActive(!this.props.currentGameActive))
    this.props.dispatch(getAnalyticsChartActive(false))
    this.props.dispatch(getCurrentGame({}))
    this.props.dispatch(getMoves([]))
  }

  handleReset() {
    this.props.dispatch(getMessageToUser(''))
    this.props.dispatch(getChessBoard(JSON.parse(JSON.stringify(jsonChessBoard))))
    this.props.dispatch(getPreviousBoard(null))
    this.props.dispatch(getMoves([]))
    this.props.dispatch(getTurn('white'))
    this.props.dispatch(getCheckmate(false))
    this.props.dispatch(getStalemate(false))
    this.props.dispatch(getSelected(null))
    this.props.dispatch(getCrossedPawn(false))
    this.props.dispatch(getAnalyticsChartActive(false))
    this.props.dispatch(setAiGameId(null))
  }

  noFormsActive() {
    return !this.props.signUpFormActive &&
        !this.props.signInFormActive &&
        !this.props.challengePlayer &&
        !this.props.challengeRobot &&
        !this.props.myGamesActive
  }

  handleAnalyticsChart() {
    if(!this.props.analyticsChartActive) {
      this.gameService.fetchAnalytics(this.props.moves.map((move) => move.notation))
      .then(response => response.json())
      .then(responseJson => {
        let chartData = [{ value: parseInt(responseJson.data.attributes.whiteWins, 10), color: '#cd853f' },
          { value: parseInt(responseJson.data.attributes.blackWins, 10), color: '#8b4513' },
          { value: parseInt(responseJson.data.attributes.draws, 10), color: '#7d8ca3' }]
        this.props.dispatch(getChartData(chartData))
      })
      .catch((error) => alert(error))
    }
    this.props.dispatch(getAnalyticsChartActive(!this.props.analyticsChartActive))
  }

  get credentialForm() {
    if (this.props.signUpFormActive || this.props.signInFormActive) {
      return <CredentialForm updateSignInInfo={this.updateSignInInfo}/>
    } else {
      return null
    }
  }

  get credentialButtons() {
    if(this.props.signUpFormActive || this.props.signInFormActive) {
        return null
    } else if(this.props.loggedIn) {
        return <button className='logOutButton' onClick={this.handleLogout}>Logout</button>
    } else {
      return (
        <div>
          <button className='signInButton btn-warning' onClick={this.handleCredentialForm}>Sign In</button>
          <button className='signUpButton btn-primary' onClick={this.handleCredentialForm}>Sign Up</button>
        </div>
      )
    }
  }

  get moveLog() {
    if(this.noFormsActive()) {
      let moveLog
      if(this.props.moveLogActive) {
        moveLog = <MoveLog handleMoveLog={this.handleMoveLog} />
      } else {
        moveLog = <button className='moveLogButton' onClick={this.handleMoveLog}>
          Move Log
        </button>
      }
      return moveLog
    } else {
      return null
    }
  }

  get resetButton() {
    let content = this.props.aiGameId ? 'Stop' : 'Reset'

    if(this.noFormsActive() && !this.props.currentGameActive) {
      return <button className='resetButton' onClick={this.handleReset}>{content}</button>
    } else {
      return null
    }
  }

  get gamePlayButtons() {
    if(this.props.loggedIn &&
        !this.props.challengePlayer &&
        !this.props.challengeRobot &&
        !this.props.currentGameActive) {
      return(
        <div>
          <GamePlayButton content='Play Robot' />
          <GamePlayButton content='Challenge Player' />
        </div>
      )
    } else {
      return null
    }
  }

  get challengeForm() {
    if(this.props.challengePlayer || this.props.challengeRobot) {
      return <ChallengeForm />
    } else {
      return null
    }
  }

  get myGamesButton() {
    if (this.props.loggedIn) {
      if (!this.props.myGamesActive) {
        return (
          <button className='myGamesButton' onClick={this.handleMyGamesActive}>
            My Games
          </button>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  get resignButton() {
    if(this.props.currentGameActive && !this.props.currentGame.attributes.outcome) {
      let outcome = this.props.currentGame.attributes.playerColor === 'white' ? 'black wins' : 'white wins'
      return (
        <button className='resignCurrentGameButton' onClick={() => this.props.handleEndGame(outcome, true, this.props.currentGame.id)}>
          Resign
        </button>
      )
    } else {
      return null
    }
  }

  get loader() {
    if(this.props.loading) {
      return <Loader />
    } else {
      return null
    }
  }

  get analytics() {
    if(this.props.analyticsChartActive) {
      return <Analytics handleAnalyticsChart={this.handleAnalyticsChart} chartData={this.props.chartData} />
    } else if (!this.props.signUpFormActive && !this.props.signInFormActive && !this.props.thumbnails) {
      return(
        <button className='analyticsButton' onClick={this.handleAnalyticsChart}>
          Analytics
        </button>
      )
    } else {
      return null
    }
  }

  render() {
    return(
      <div className='sideBar col-md-2 col-xs-12'>
        {this.loader}
        {this.props.messageToUser}
        {this.credentialButtons}
        {this.credentialForm}
        <div className='user-header'>
          {this.props.hashedEmail !== '' ? <img className='gravatar' src={`https://www.gravatar.com/avatar/${this.props.hashedEmail}`} alt="gravatar"/> : null}
        </div>
        {this.moveLog}
        {this.analytics}
        {this.resetButton}
        {this.gamePlayButtons}
        {this.challengeForm}
        {this.resignButton}
        {this.myGamesButton}
      </div>
    )
  }
}

const mapStateToProps = ({
  moveLogActive, token, loggedIn, hashedEmail, messageToUser, challengePlayer,
  myGamesActive, thumbnails, turn, playerColor, challengeColor, currentGameActive,
  currentGame, chessBoard, moves, loading, challengedName, challengedEmail,
  signUpFormActive, signInFormActive, userGames, challengeRobot, analyticsChartActive,
  whiteWins, blackWins, draws, chartData, aiGameId
 }) => {
  return {
    moveLogActive, token, loggedIn, hashedEmail, messageToUser, challengePlayer,
    myGamesActive, thumbnails, turn, playerColor, challengeColor, currentGameActive,
    currentGame, chessBoard, moves, loading, challengedName, challengedEmail,
    signUpFormActive, signInFormActive, userGames, challengeRobot, analyticsChartActive,
    whiteWins, blackWins, draws, chartData, aiGameId
  }
}

export default connect(mapStateToProps)(SideBar)
