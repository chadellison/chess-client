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

    get moveLog() {
        if(!this.props.signUpFormActive && !this.props.signInFormActive && !this.props.challengePlayer) {
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
        if(!this.props.signUpFormActive && !this.props.signInFormActive && !this.props.challengePlayer) {
            return <button className='resetButton' onClick={this.props.handleReset}>Reset</button>
        } else {
            return null
        }
    }

    get gamePlayButtons() {
      if(this.props.loggedIn && !this.props.challengePlayer) {
        return(
          <div>
            <button className='challengeButton'>Play Robot</button>
            <button className='challengeButton' onClick={this.props.handleChallengePlayer}>
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
            <button className='button color-white underline' onClick={this.props.handlePlayerColor}>
              White
            </button>
            <button className='button color-black' onClick={this.props.handlePlayerColor}>
              Black
            </button>
          </div>
        )
      } else {
        return(
          <div>
            <button className='button color-white' onClick={this.props.handlePlayerColor}>
              White
            </button>
            <button className='button color-black underline' onClick={this.props.handlePlayerColor}>
              Black
            </button>
          </div>
        )
      }
    }

    get challengePlayerForm() {
      if(this.props.challengePlayer) {
        return(
          <div>
            <h5>Enter the name and email of the person you would like to challenge</h5>
            <input className='firstNameInput' placeholder='Name'></input>
            <input className='emailInput' placeholder='Email'></input>
            {this.playerColorButtons}
            <button className='challengeButton'>Challenge This player</button>
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
              {this.challengePlayerForm}
          </div>
        )
    }
}
