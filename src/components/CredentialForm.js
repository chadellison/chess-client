import React, { Component } from "react"
import "../styles/CredentialForm.css"
import { connect } from 'react-redux'
import {
  getLoading,
  getEmail,
  getPassword,
  getLoggedInData,
  getMessageToUser
} from '../actions/index'

class CredentialForm extends Component {
  constructor() {
    super()
  }

  handleUserSignIn() {
    this.props.dispatch(getLoading(true))
    this.userService.signIn(this.props.email, this.props.password)
      .then(response => response.json())
      .then(responseJson => {
        let loggedInData

        if (responseJson.errors) {
          this.props.dispatch(getMessageToUser(responseJson.errors))
          this.props.dispatch(getLoading(false))
        } else {
          loggedInData = {
            token: responseJson.data.attributes.token,
            signInFormActive: false,
            signUpFormActive: false,
            loggedIn: true,
            messageToUser: 'Welcome to Chess Mail!',
            hashedEmail: responseJson.data.attributes.hashed_email,
            email: '',
            password: '',
            firstName: responseJson.data.attributes.firstName,
            lastName: responseJson.data.attributes.lastName,
            userGames: responseJson.data.included,
            thumbNails: true,
            myGamesActive: true,
            loading: false
          }
        }

        localStorage.setItem('state', JSON.stringify(loggedInData))
        this.props.dispatch(getLoggedInData(loggedInData))
      })
      .catch((error) => alert(error))
  }

  get fields() {
    if(this.props.signUpFormActive) {
      return(
        <div>
          <h4>First Name</h4>
          <input className='firstNameInput' onChange={this.props.handleFirstName}></input>
          <h4>Last Name</h4>
          <input className='lastNameInput' onChange={this.props.handleLastName}></input>
        </div>
      )
    } else {
      return null
    }
  }

  get buttonName() {
    if(this.props.signInFormActive) {
      return 'Sign In'
    } else {
      return 'Sign Up'
    }
  }

  get buttons() {
    if (this.props.signInFormActive) {
      return (
        <button className='signInButton' onClick={this.handleUserSignIn}>
          {this.buttonName}
        </button>
      )
    } else {
      return (
        <button className='signUpButton' onClick={this.props.handleUserSignUp}>
          {this.buttonName}
        </button>
      )
    }
  }

  render() {
    return (
      <div>
        <h4>Email</h4>
        <input className='emailInput' onChange={this.props.handleUserEmail}></input>
        <h4>Password</h4>
        <input className='passwordInput' type="password" onChange={this.props.handleUserPassword}></input>
        {this.fields}
        {this.buttons}
        <button className='cancelButton' onClick={this.props.handleCredentialForm}>Cancel</button>
      </div>
    )
  }
}

const mapStateToProps = ({
  loading, email, password, token, signInFormActive, signUpFormActive, loggedIn,
  messageToUser, hashedEmail, firstName, lastName, userGames, thumbNails,
  myGamesActive
 }) => {
  return {
    loading, email, password, token, signInFormActive, signUpFormActive, loggedIn,
    messageToUser, hashedEmail, firstName, lastName, userGames, thumbNails,
    myGamesActive
  }
}

export default connect(mapStateToProps)(CredentialForm)
