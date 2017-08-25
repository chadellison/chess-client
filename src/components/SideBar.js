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
                handleUserSignIn={this.props.handleUserSignIn}
                handleUserSignUp={this.props.handleUserSignUp}
                signInFormActive={this.props.signInFormActive}
            />
        } else {
            return null
        }

    }

    get buttons() {
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
        if(!this.props.signUpFormActive && !this.props.signInFormActive) {
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
        if(!this.props.signUpFormActive && !this.props.signInFormActive) {
            return <button className='resetButton' onClick={this.props.handleReset}>Reset</button>
        } else {
            return null
        }
    }

    render() {
        return(
          <div className='sideBar col-xs-2'>
              {this.buttons}
              {this.credentialForm}
              {this.props.messageToUser}
              <div className='user-header'>
                  {this.props.hashedEmail !== '' ? <img className='gravatar' src={`https://www.gravatar.com/avatar/${this.props.hashedEmail}`} alt="gravatar"/> : null}
              </div>

              {this.moveLog}
              {this.resetButton}
          </div>
        )
    }
}
