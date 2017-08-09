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
            loggedIn: ''
        }
        this.handleSelected = this.handleSelected.bind(this)
        this.handleCredentialForm = this.handleCredentialForm.bind(this)
        this.handleUserEmail = this.handleUserEmail.bind(this)
        this.handleUserPassword = this.handleUserPassword.bind(this)
        this.handleUserSubmit = this.handleUserSubmit.bind(this)
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

    handleUserSubmit() {
        let url
        if(this.state.signUpFormActive) {
            url = 'http://localhost:8080/api/users'
        } else {
            url = 'http://localhost:8080/api/authentication'
        }
        let body = JSON.stringify({email: this.state.email, password: this.state.password})
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }

        fetch(url,
            {
                method: "POST",
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then(responseJson => this.setState({
                token: responseJson.token,
                email: '',
                password: '',
                signInFormActive: false,
                signUpFormActive: false,
                loggedIn: responseJson.email
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
                signUpFormActive: false
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
                handleUserSubmit={this.handleUserSubmit}
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
