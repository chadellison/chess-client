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
            email: '',
            password: ''
        }
        this.handleSelected = this.handleSelected.bind(this)
        this.handleSignUpForm = this.handleSignUpForm.bind(this)
        this.handleUserEmail = this.handleUserEmail.bind(this)
        this.handleUserPassword = this.handleUserPassword.bind(this)
        this.handleCreateUser = this.handleCreateUser.bind(this)
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

    handleCreateUser() {

        let body = JSON.stringify({email: this.state.email, password: this.state.password})
        fetch('http://localhost:8080/api/users',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: body
            })
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

    handleSignUpForm() {
        this.setState({
            signUpFormActive: !this.state.signUpFormActive
        })
    }

    handleUserEmail(event) {
        this.setState({email: event.target.value})
    }

    handleUserPassword(event) {
        this.setState({password: event.target.value})
    }

    get signUpForm() {
        if (this.state.signUpFormActive) {
            return <SignUpForm
                handleUserEmail={this.handleUserEmail}
                handleUserPassword={this.handleUserPassword}
                handleSignUpForm={this.handleSignUpForm}
                handleCreateUser={this.handleCreateUser}
            />
        } else {
            return null
        }

    }

    render() {
        return (
            <div className='App container-fluid'>
                <button onClick={this.handleSignUpForm}>Sign Up</button>
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
