import React, { Component } from "react"
import "../styles/CredentialForm.css"

export default class CredentialForm extends Component {
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
                <button className='signInButton' onClick={this.props.handleUserSignIn}>
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
