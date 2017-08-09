import React, {Component} from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'
import MoveLogic from './helpers/MoveLogic'
import SignUpForm from './components/SignUpForm'

class App extends Component {
    constructor() {
        super()
        this.state = {
            chessBoard: jsonChessBoard,
            selected: null,
            signUpFormActive: false,
            signInFormActive: false,
            email: '',
            password: '',
            token: '',
            loggedIn: '',
            messageToUser: ''
        }
        this.handleSelected = this.handleSelected.bind(this)
        this.handleCredentialForm = this.handleCredentialForm.bind(this)
        this.handleUserEmail = this.handleUserEmail.bind(this)
        this.handleUserPassword = this.handleUserPassword.bind(this)
        this.handleUserSignIn = this.handleUserSignIn.bind(this)
        this.handleUserSignUp = this.handleUserSignUp.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.move = this.move.bind(this)
    }

    move(coordinate) {
        let updatedBoard = this.state.chessBoard
        let piece = this.state.selected

        updatedBoard[piece.currentPosition].piece = null
        piece.currentPosition = coordinate
        updatedBoard[coordinate].piece = piece

        this.setState({
            chessBoard: updatedBoard,
            selected: null
        })
    }

    handleUserSignUp() {
        let body = JSON.stringify({email: this.state.email, password: this.state.password})
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        fetch('http://localhost:8080/api/users',
            {
                method: "POST",
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then(this.setState({
                messageToUser: `Please check your email at ${this.state.email} to confirm you exist!`,
                signUpFormActive: false,
                email: '',
                password: ''
            }))
            .catch(
                this.setState({
                    messageToUser: 'Please enter a valid username and password.',
                    signUpFormActive: true
                })
            )
    }

    handleUserSignIn() {
        let body = JSON.stringify({email: this.state.email, password: this.state.password})
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        fetch('http://localhost:8080/api/authentication',
            {
                method: "POST",
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then(responseJson => this.setState({
                token: responseJson.token,
                signInFormActive: false,
                loggedIn: responseJson.email,
                messageToUser: 'Welcome to Chess!!!'
            }))
            .catch(
                this.setState({
                    messageToUser: 'Please enter a valid username and password.'
                })
            )
            .then(this.setState({
                email: '',
                password: ''
            }))

    }

    handleSelected(id) {
        if (!this.state.selected) {
            this.setState({
                selected: this.state.chessBoard[id].piece
            })
        } else if (this.state.selected === this.state.chessBoard[id].piece) {
            this.setState({
                selected: null
            })
        }
    }

    handleCredentialForm(event) {
        if(event.target.textContent === 'Sign Up') {
            this.setState({
                signUpFormActive: !this.state.signUpFormActive
            })

        } else {
            this.setState({
                signInFormActive: !this.state.signInFormActive
            })
        }
        if(event.target.textContent === 'Cancel') {
            this.setState({
                signInFormActive: false,
                signUpFormActive: false,
                messageToUser: ''
            })
        }

    }

    handleLogout() {
        this.setState({
            token: '',
            loggedIn: '',
        })
    }

    handleUserEmail(event) {
        this.setState({email: event.target.value})
    }

    handleUserPassword(event) {
        this.setState({password: event.target.value})
    }

    get signUpForm() {
        if (this.state.signUpFormActive || this.state.signInFormActive) {
            return <SignUpForm
                handleUserEmail={this.handleUserEmail}
                handleUserPassword={this.handleUserPassword}
                handleCredentialForm={this.handleCredentialForm}
                userEmail={this.state.email}
                userPassword={this.state.password}
                handleUserSignIn={this.handleUserSignIn}
                handleUserSignUp={this.handleUserSignUp}
                signInFormActive={this.state.signInFormActive}
            />
        } else {
            return null
        }

    }

    get buttons() {
        let buttons
        if(this.state.signUpFormActive || this.state.signInFormActive) {
            buttons = null
        } else if(this.state.loggedIn !== '') {
            buttons = <button onClick={this.handleLogout}>Logout</button>
        } else {
            buttons = (
                <div>
                    <button onClick={this.handleCredentialForm}>Sign In</button>
                    <button onClick={this.handleCredentialForm}>Sign Up</button>
                </div>
            )
        }
        return buttons
    }

    render() {
        return (
            <div className='App container-fluid'>
                {this.buttons}
                {this.signUpForm}
                {this.state.messageToUser}
                <Board chessBoard={this.state.chessBoard}
                       handleSelected={this.handleSelected}
                       isSelected={this.state.selected}
                       move={this.move}
                />
            </div>
        )
    }
}

export default App
