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
            moves: [],
            selected: null,
            signUpFormActive: false,
            signInFormActive: false,
            email: '',
            password: '',
            token: '',
            loggedIn: '',
            messageToUser: '',
            hashedEmail: '',
            turn: 'white'
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

    isValid(coordinates) {
        const board = this.state.chessBoard
        let piece = this.state.selected
        let kingLocation = Object.values(board).filter((square) => {
          return(
              square.piece &&
              square.piece.type === 'king' &&
              square.piece.color === piece.color
            )
        })[0].piece.currentPosition

        return(
            MoveLogic.movesForPiece(piece, board)[piece.type].includes(coordinates) &&
            MoveLogic.validMovePath(piece.currentPosition, coordinates, board) &&
            MoveLogic.validateDestination(piece, coordinates, board) &&
            MoveLogic.kingIsSafe(piece, coordinates, board, kingLocation)
        )
    }

    move(coordinates) {
        if(this.isValid(coordinates)) {
            let updatedBoard = this.state.chessBoard
            let piece = this.state.selected
            let updatedMoves = this.state.moves

            updatedBoard[piece.currentPosition].piece = null
            updatedBoard[coordinates].piece = piece
            piece.currentPosition = coordinates
            updatedMoves.push(piece)
            this.setState({
              chessBoard: updatedBoard,
              moves: updatedMoves,
              turn: this.updateTurn()
            })
        } else {
            console.log('invalid move')
        }
        this.setState({
            selected: null
        })
    }

    updateTurn() {
      return this.state.turn === 'white' ? 'black' : 'white'
    }

    handleUserSignUp() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        let body = JSON.stringify({email: this.state.email, password: this.state.password})
        fetch('http://localhost:8080/api/users',
            {
                method: "POST",
                headers: headers,
                body: body
            })
            .then(() => this.setState({
                messageToUser: `Please check your email at ${this.state.email} to confirm you exist!`,
                signUpFormActive: false,
                signInFormActive: false,
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
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        let body = JSON.stringify({email: this.state.email, password: this.state.password})
        fetch('http://localhost:8080/api/authentication',
            {
                method: "POST",
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                token: responseJson.token,
                signInFormActive: false,
                signUpFormActive: false,
                loggedIn: responseJson.email,
                messageToUser: 'Welcome to Chess!!!',
                hashedEmail: responseJson.hashedEmail
            })})
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
        if(this.state.chessBoard[id].piece.color === this.state.turn) {
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
            hashedEmail: '',
            messageToUser: ''
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
                <div className="user-header">
                    {this.state.messageToUser}
                    { this.state.hashedEmail !== '' ? <img src={`https://www.gravatar.com/avatar/${this.state.hashedEmail}`} alt="gravatar"/> : null}
                </div>
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
