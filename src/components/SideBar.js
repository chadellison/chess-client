import React, { Component } from 'react'
import '../styles/SideBar.css'
import MoveLog from './MoveLog'
import CredentialForm from './CredentialForm'

export default class SideBar extends Component {
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
        let buttons
        if(this.props.signUpFormActive || this.props.signInFormActive) {
            buttons = null
        } else if(this.props.loggedIn) {
            buttons = <button className='logOutButton' onClick={this.props.handleLogout}>Logout</button>
        } else {
            buttons = (
                <div>
                  <button className='signInButton' onClick={this.props.handleCredentialForm}>Sign In</button>
                  <button className='signUpButton' onClick={this.props.handleCredentialForm}>Sign Up</button>
                </div>
            )
        }
        return buttons
    }

    noFormsActive() {
      return !this.props.signUpFormActive &&
          !this.props.signInFormActive &&
          !this.props.challengePlayer &&
          !this.props.challengeRobot
    }

    get moveLog() {
      if(this.noFormsActive()) {
        let moveLog
        if(this.props.moveLogActive) {
          moveLog = <MoveLog
              cancelMoveLog={this.props.handleMoveLog}
              moves={this.props.moves}
              handlePreviousBoard={this.props.handlePreviousBoard}
          />
        } else {
          moveLog = <button className='moveLogButton' onClick={this.props.handleMoveLog}>
            Move Log
          </button>
        }
        return moveLog
      } else {
        return null
      }
    }

    get resetButton() {
      if(this.noFormsActive()) {
        return <button className='resetButton' onClick={this.props.handleReset}>Reset</button>
      } else {
        return null
      }
    }

    get gamePlayButtons() {
      if(this.props.loggedIn && !this.props.challengePlayer && !this.props.challengeRobot) {
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

    get playerColorButtons() {
      if(this.props.playerColor === 'white') {
        return(
          <div>
            <div className='button col-xs-4 color-white underline' onClick={this.props.handlePlayerColor}>
              White
            </div>
            <div className='button col-xs-4 color-black' onClick={this.props.handlePlayerColor}>
              Black
            </div>
          </div>
        )
      } else {
        return(
          <div>
            <div className='button col-xs-4 color-white' onClick={this.props.handlePlayerColor}>
              White
            </div>
            <div className='button col-xs-4 color-black underline' onClick={this.props.handlePlayerColor}>
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
            {this.playerColorButtons}
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

    render() {
      return(
        <div className='sideBar col-xs-2'>
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
          <button className='myGames'>My Games</button>
        </div>
      )
    }
}
