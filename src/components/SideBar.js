import React, { Component } from 'react'
import '../styles/SideBar.css'
import jsonChessBoard from '../jsonChessBoard'
import MoveLog from './MoveLog'
import CredentialForm from './CredentialForm'
import Loader from './Loader'
import { getMoveLogActive, getLogout } from '../actions/index'
import { connect } from 'react-redux'

class SideBar extends Component {
  constructor() {
    super()
    this.state = {
      previousBoard: null,
      moves: [],
    }

    this.handleMoveLog = this.handleMoveLog.bind(this)
    this.handleLogout  = this.handleLogout.bind(this)
  }

  handleMoveLog() {
    this.props.dispatch(getMoveLogActive(!this.props.moveLogActive))
  }

  handleLogout() {
    localStorage.removeItem('state')

    let logoutData = {
      token: '',
      loggedIn: '',
      hashedEmail: '',
      messageToUser: 'successfully logged out',
      challengePlayer: false,
      myGamesActive: false,
      thumbNails: false,
      turn: 'white',
      playerColor: 'white',
      challengeColor: 'white',
      currentGameActive: false,
      currentGame: null,
      chessBoard: JSON.parse(JSON.stringify(jsonChessBoard)),
      moves: [],
      moveLogActive: false
    }

    this.props.dispatch(getLogout(logoutData))
  }

  get credentialForm() {
    if (this.props.signUpFormActive || this.props.signInFormActive) {
      return <CredentialForm
        handleUserEmail={this.props.handleUserEmail}
        handleUserPassword={this.props.handleUserPassword}
        handleCredentialForm={this.props.handleCredentialForm}
        userEmail={this.props.email}
        userPassword={this.props.password}
        handleFirstName={this.props.handleFirstName}
        handleLastName={this.props.handleLastName}
        handleUserSignIn={this.props.handleUserSignIn}
        handleUserSignUp={this.props.handleUserSignUp}
        signInFormActive={this.props.signInFormActive}
        signUpFormActive={this.props.signUpFormActive}
      />
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
          <button className='signInButton' onClick={this.props.handleCredentialForm}>Sign In</button>
          <button className='signUpButton' onClick={this.props.handleCredentialForm}>Sign Up</button>
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
          cancelMoveLog={this.handleMoveLog}
          moves={this.state.moves}
          handlePreviousBoard={this.state.handlePreviousBoard}
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
      return <button className='resetButton' onClick={this.props.handleReset}>Reset</button>
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
          <button className='challengeButton' onClick={this.props.handleChallenge}>
            Play Robot
          </button>
          <button className='challengeButton' onClick={this.props.handleChallenge}>
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
          <div className='button col-xs-4 color-white underline' onClick={this.props.handleChallengeColor}>
            White
          </div>
          <div className='button col-xs-4 color-black' onClick={this.props.handleChallengeColor}>
            Black
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div className='button col-xs-4 color-white' onClick={this.props.handleChallengeColor}>
            White
          </div>
          <div className='button col-xs-4 color-black underline' onClick={this.props.handleChallengeColor}>
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
            onChange={this.props.handleChallengedInfo}>
          </input>
          <input className='challengedEmail'
            placeholder='Email'
            onChange={this.props.handleChallengedInfo}>
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
          <button className='challengeButton' onClick={this.props.handleSubmitChallenge}>
            Challenge
          </button>
          <button className='cancelButton' onClick={this.props.handleCancelChallenge}>
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
          <button className='myGamesButton' onClick={this.props.handleMyGamesActive}>
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
          {this.props.hashedEmail !== undefined ? <img className='gravatar' src={`https://www.gravatar.com/avatar/${this.props.hashedEmail}`} alt="gravatar"/> : null}
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
  currentGame, chessBoard, moves
 }) => {
  return { moveLogActive, token, loggedIn, hashedEmail, messageToUser, challengePlayer,
    myGamesActive, thumbNails, turn, playerColor, challengerColor, currentGameActive,
    currentGame, chessBoard, moves
  }
}

export default connect(mapStateToProps)(SideBar)
