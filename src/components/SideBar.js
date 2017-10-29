import React, { Component } from 'react'
import '../styles/SideBar.css'
import jsonChessBoard from '../jsonChessBoard'
import MoveLog from './MoveLog'
import CredentialForm from './CredentialForm'
import Loader from './Loader'
import GameService from '../services/GameService'
import { connect } from 'react-redux'
import {
  getMoveLogActive,
  getChallengePlayer,
  getChallengeRobot,
  getChallengedName,
  getChallengedEmail,
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
  getUserGames
} from '../actions/index'

class SideBar extends Component {
  constructor() {
    super()
    this.gameService = new GameService()

    this.handleMoveLog         = this.handleMoveLog.bind(this)
    this.handleLogout          = this.handleLogout.bind(this)
    this.handleCredentialForm  = this.handleCredentialForm.bind(this)
    this.handleMyGamesActive   = this.handleMyGamesActive.bind(this)
    this.handleReset           = this.handleReset.bind(this)
    this.updateSignInInfo      = this.updateSignInInfo.bind(this)
    this.handleSubmitChallenge = this.handleSubmitChallenge.bind(this)
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
  }

  handleSubmitChallenge() {
    let gameBody = {}
    if(this.props.challengeRobot) {
      gameBody.challengedName = 'robot'
      gameBody.challengedEmail = 'robot'
      gameBody.challengerColor = this.props.challengeColor
      gameBody.human = false
    } else {
      gameBody.challengedName = this.props.challengedName
      gameBody.challengedEmail = this.props.challengedEmail
      gameBody.challengerColor = this.props.challengeColor
      gameBody.human = true

    }
    this.gameService.createGame(gameBody, this.props.token)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errors) {
        this.props.getMessageToUser(responseJson.errors)
      } else {
        let updatedUserGames = this.props.userGames
        updatedUserGames.unshift(responseJson.data)
        this.props.dispatch(getUserGames(updatedUserGames))
        this.props.dispatch(getMessageToUser(`Your challenge has been submitted to ${this.props.challengedName}!`))
        this.props.dispatch(getChallengePlayer(false))
        this.props.dispatch(getChallengeRobot(false))
        this.props.dispatch(getChallengedName(''))
        this.props.dispatch(getChallengedEmail(''))
      }
    })
    .catch((error) => alert(error))
  }

  handleCredentialForm(event) {
    if(event.target.textContent === 'Sign Up') {
      this.props.dispatch(getSignUpFormActive(!this.props.signUpFormActive))
    }
    if(event.target.textContent === 'Sign In') {
      this.props.dispatch(getSignInFormActive(!this.props.signInFormActive))
    }
  }

  handleChallenge(event) {
    if(event.target.textContent === 'Play Robot') {
      this.props.dispatch(getChallengeRobot(true))
    } else {
      this.props.dispatch(getChallengePlayer(true))
    }
  }

  handleCancelChallenge() {
    this.props.dispatch(getChallengePlayer(false))
    this.props.dispatch(getChallengeRobot(false))
    this.setState({
      challengedName: '',
      challengedEmail: '',
      challengeColor: 'whtie'
    })
  }

  handleChallengedInfo(event) {
    if(event.target.className === 'challengedFirstName') {
      this.props.dispatch(getChallengedName(event.target.value))
    }

    if(event.target.className === 'challengedEmail') {
      this.props.dispatch(getChallengedEmail(event.target.value))
    }
  }

  handleChallengeColor(event) {
    let color

    if(event.target.textContent === 'White') {
      color = 'white'
    }
    if(event.target.textContent === 'Black') {
      color = 'black'
    }
    this.props.dispatch(getChallengeColor(color))
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

    localStorage.removeItem('state')
  }

  handleMyGamesActive() {
    this.props.dispatch(getMessageToUser(''))
    this.props.dispatch(getMyGamesActive(!this.state.myGamesActive))
    this.props.dispatch(getThumbnails(!this.state.thumbNails))
    this.props.dispatch(getCurrentGameActive(!this.state.currentGameActive))
  }

  handleReset() {
    this.props.dispatch(getMessageToUser(''))
    this.props.dispatch(getChessBoard(JSON.parse(JSON.stringify(jsonChessBoard))))
    this.props.dispatch(getPreviousBoard(null))
    this.props.dispatch(getMoves([]))
    this.props.dispatch(getTurn())
    this.props.dispatch(getCheckmate(false))
    this.props.dispatch(getStalemate(false))
    this.props.dispatch(getSelected(null))
    this.props.dispatch(getCrossedPawn(false))
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
          <button className='signInButton' onClick={this.handleCredentialForm}>Sign In</button>
          <button className='signUpButton' onClick={this.handleCredentialForm}>Sign Up</button>
        </div>
      )
    }
  }

  noFormsActive() {
    return !this.props.signUpFormActive &&
        !this.props.signInFormActive &&
        !this.props.challengePlayer &&
        !this.props.challengeRobot &&
        !this.props.myGamesActive
  }

  get moveLog() {
    if(this.noFormsActive()) {
      let moveLog
      if(this.props.moveLogActive) {
        moveLog = <MoveLog
          handleMoveLog={this.handleMoveLog}
          // moves={this.state.moves}
          // handlePreviousBoard={this.handlePreviousBoard}
        />
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
    if(this.noFormsActive() && !this.props.currentGameActive) {
      return <button className='resetButton' onClick={this.handleReset}>Reset</button>
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
          <button className='challengeButton' onClick={this.handleChallenge}>
            Play Robot
          </button>
          <button className='challengeButton' onClick={this.handleChallenge}>
            Challenge Player
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  get challengeColorButtons() {
    if(this.props.challengeColor === 'white') {
      return(
        <div>
          <div className='button col-xs-4 color-white underline' onClick={this.handleChallengeColor}>
            White
          </div>
          <div className='button col-xs-4 color-black' onClick={this.handleChallengeColor}>
            Black
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div className='button col-xs-4 color-white' onClick={this.handleChallengeColor}>
            White
          </div>
          <div className='button col-xs-4 color-black underline' onClick={this.handleChallengeColor}>
            Black
          </div>
        </div>
      )
    }
  }

  get challengePlayerFields() {
    if(this.props.challengePlayer) {
      return (
        <div>
          <h5>Enter the name and email of the person you would like to challenge</h5>
          <input className='challengedFirstName'
            placeholder='Name'
            onChange={this.handleChallengedInfo}>
          </input>
          <input className='challengedEmail'
            placeholder='Email'
            onChange={this.handleChallengedInfo}>
          </input>
        </div>
      )
    } else {
      return null
    }
  }

  get challengeForm() {
    if(this.props.challengePlayer || this.props.challengeRobot) {
      return(
        <div>
          {this.challengePlayerFields}
          {this.challengeColorButtons}
          <button className='challengeButton' onClick={this.handleSubmitChallenge}>
            Challenge
          </button>
          <button className='cancelButton' onClick={this.handleCancelChallenge}>
            Cancel
          </button>
        </div>
      )
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
  myGamesActive, thumbNails, turn, playerColor, challengerColor, currentGameActive,
  currentGame, chessBoard, moves, loading, challengedName, challengedEmail,
  signUpFormActive, signInFormActive
 }) => {
  return {
    moveLogActive, token, loggedIn, hashedEmail, messageToUser, challengePlayer,
    myGamesActive, thumbNails, turn, playerColor, challengerColor, currentGameActive,
    currentGame, chessBoard, moves, loading, challengedName, challengedEmail,
    signUpFormActive, signInFormActive
  }
}

export default connect(mapStateToProps)(SideBar)
