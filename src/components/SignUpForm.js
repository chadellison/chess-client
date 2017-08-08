import React, { Component } from "react"
import "../styles/SignUpForm.css"

export default class SignUpForm extends Component {
    render() {
        return (
            <div>
                <h4 >Email</h4>
                <input onChange={this.props.handleUserEmail}></input>
                <h4>Password</h4>
                <input type="password" onChange={this.props.handleUserPassword}></input>
                <button onClick={this.props.handleCreateUser}>Sign Up</button>
                <button onClick={this.props.handleSignUpForm}>Cancel</button>
            </div>
        )
    }
}