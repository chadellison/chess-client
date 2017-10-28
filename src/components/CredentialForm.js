import React, { Component } from "react"
import "../styles/CredentialForm.css"
import UserService from '../services/UserService'
import { connect } from 'react-redux'
import {
  getLoading,
  getMessageToUser,
  getSignUpData,
  getSignUpFormActive,
  getSignInFormActive,
  getEmail,
  getPassword,
  getFirstName,
  getLastName,
  getToken,
  getLoggedIn,
  getHashedEmail,
  getThumbnails,
  getUserGames,
  getMyGamesActive
} from '../actions/index'

class CredentialForm extends Component {
  constructor() {
    super()
    this.userService = new UserService()

    this.handleCancelCredentialForm = this.handleCancelCredentialForm.bind(this)
    this.handleFirstName            = this.handleFirstName.bind(this)
    this.handleLastName             = this.handleLastName.bind(this)
    this.handleUserEmail            = this.handleUserEmail.bind(this)
    this.handleUserPassword         = this.handleUserPassword.bind(this)
    this.handleUserSignIn           = this.handleUserSignIn.bind(this)
  }

  handleFirstName(event) {
    this.props.dispatch(getFirstName(event.target.value))
  }
  handleLastName(event) {
    this.props.dispatch(getLastName(event.target.value))
  }
  handleUserEmail(event) {
    this.props.dispatch(getEmail(event.target.value))
  }

  handleUserPassword(event) {
      this.props.dispatch(getPassword(event.target.value))
  }

  handleCancelCredentialForm() {
    this.props.dispatch(getMessageToUser(''))
    this.props.dispatch(getSignUpFormActive(false))
    this.props.dispatch(getSignInFormActive(false))
    this.props.dispatch(getEmail(''))
    this.props.dispatch(getPassword(''))
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
          this.props.dispatch(getToken(responseJson.data.attributes.token))
          this.props.dispatch(getSignUpFormActive(false))
          this.props.dispatch(getSignInFormActive(false))
          this.props.dispatch(getLoggedIn(true))
          this.props.dispatch(getMessageToUser('Welcome to Chess Mail!'))
          this.props.dispatch(getHashedEmail(responseJson.data.attributes.hashed_email))
          this.props.dispatch(getEmail(''))
          this.props.dispatch(getPassword(''))
          this.props.dispatch(getFirstName(responseJson.data.attributes.firstName))
          this.props.dispatch(getLastName(responseJson.data.attributes.lastName))
          this.props.dispatch(getUserGames(responseJson.data.included))
          this.props.dispatch(getThumbnails(true))
          this.props.dispatch(getMyGamesActive(true))
          this.props.dispatch(getLoading(false))
          // loggedInData = {
          //   token: responseJson.data.attributes.token,
          //   signInFormActive: false,
          //   signUpFormActive: false,
          //   loggedIn: true,
          //   messageToUser: 'Welcome to Chess Mail!',
          //   hashedEmail: responseJson.data.attributes.hashed_email,
          //   email: '',
          //   password: '',
          //   firstName: responseJson.data.attributes.firstName,
          //   lastName: responseJson.data.attributes.lastName,
          //   userGames: responseJson.data.included,
          //   thumbNails: true,
          //   myGamesActive: true,
          //   loading: false
          // }
          localStorage.setItem('state', JSON.stringify(loggedInData))
        }
      })
      .catch((error) => alert(error))
  }

  handleUserSignUp() {
    this.userService.createUser(this.props.email, this.props.password, this.props.firstName, this.props.lastName)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.errors) {
          this.props.dispatch(getMessageToUser(responseJson.errors))
          this.props.dispatch(getSignUpFormActive(true))
        } else {
          let message = `Great ${this.props.firstName}! Please check your email at ${this.props.email} to confirm your account!`
          let signUpData = {
            messageToUser: message,
            signUpFormActive: false,
            signInFormActive: false,
            email: '',
            password: '',
            firstName: '',
            lastName: ''
          }
          this.props.dispatch(getSignUpData(signUpData))
        }
      })
      .catch((error) => alert(error))
  }

  get fields() {
    if(this.props.signUpFormActive) {
      return(
        <div>
          <h4>First Name</h4>
          <input className='firstNameInput' onChange={this.handleFirstName}></input>
          <h4>Last Name</h4>
          <input className='lastNameInput' onChange={this.handleLastName}></input>
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
        <button className='signUpButton' onClick={this.handleUserSignUp}>
          {this.buttonName}
        </button>
      )
    }
  }

  render() {
    return (
      <div>
        <h4>Email</h4>
        <input className='emailInput' onChange={this.handleUserEmail}></input>
        <h4>Password</h4>
        <input className='passwordInput' type="password" onChange={this.handleUserPassword}></input>
        {this.fields}
        {this.buttons}
        <button className='cancelButton' onClick={this.handleCancelCredentialForm}>Cancel</button>
      </div>
    )
  }
}

const mapStateToProps = ({
  loading, email, password, token, signInFormActive, signUpFormActive, loggedIn,
  messageToUser, hashedEmail, firstName, lastName, userGames, thumbnails,
  myGamesActive
 }) => {
  return {
    loading, email, password, token, signInFormActive, signUpFormActive, loggedIn,
    messageToUser, hashedEmail, firstName, lastName, userGames, thumbnails,
    myGamesActive
  }
}

export default connect(mapStateToProps)(CredentialForm)
