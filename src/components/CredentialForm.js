import React, { Component } from "react"
import "../styles/CredentialForm.css"

export default class CredentialForm extends Component {
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
                <input className='emailInput' onChange={this.props.handleUserEmail} value={this.props.userEmail}></input>
                <h4>Password</h4>
                <input className='passwordInput' type="password" onChange={this.props.handleUserPassword} value={this.props.userPassword}></input>
                {this.buttons}
                <button className='cancelButton' onClick={this.props.handleCredentialForm}>Cancel</button>
            </div>
        )
    }
}
