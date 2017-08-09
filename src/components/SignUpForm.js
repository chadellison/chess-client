import React, { Component } from "react"
import "../styles/SignUpForm.css"

export default class SignUpForm extends Component {
    get buttonName() {
        if(this.props.signInFormActive) {
            return 'Sign In'
        } else {
            return 'Sign Up'
        }
    }

    render() {
        return (
            <div>
                <h4 >Email</h4>
                <input onChange={this.props.handleUserEmail} value={this.props.userEmail}></input>
                <h4>Password</h4>
                <input type="password" onChange={this.props.handleUserPassword} value={this.props.userPassword}></input>
                <button onClick={this.props.handleUserSubmit}>{this.buttonName}</button>
                <button onClick={this.props.handleCredentialForm}>Cancel</button>
            </div>
        )
    }
}