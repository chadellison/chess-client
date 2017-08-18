import React, {Component} from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'
import MoveLogic from './helpers/MoveLogic'
import MoveLog from './components/MoveLog'
import SignUpForm from './components/SignUpForm'

class App extends Component {
    constructor() {
        super()
        this.state = {
            chessBoard: JSON.parse(JSON.stringify(jsonChessBoard)),
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
            turn: 'white',
            moveLogActive: false
        }
        this.handleSelected = this.handleSelected.bind(this)
        this.handleCredentialForm = this.handleCredentialForm.bind(this)
        this.handleUserEmail = this.handleUserEmail.bind(this)
        this.handleUserPassword = this.handleUserPassword.bind(this)
        this.handleUserSignIn = this.handleUserSignIn.bind(this)
        this.handleUserSignUp = this.handleUserSignUp.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.move = this.move.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleMoveLog = this.handleMoveLog.bind(this)
    }

    isValid(piece, coordinates, board, gameMoves) {
        let moveLogic = new MoveLogic()

        return (moveLogic.validMove(piece, coordinates, board, gameMoves) &&
            moveLogic.kingIsSafe(piece, coordinates, board, gameMoves)
        )
    }

    move(coordinates) {
        let piece = JSON.parse(JSON.stringify(this.state.selected))
        let board = JSON.parse(JSON.stringify(this.state.chessBoard))
        let gameMoves = JSON.parse(JSON.stringify(this.state.moves))

        if(this.isValid(piece, coordinates, board, gameMoves)) {
            let updatedBoard = JSON.parse(JSON.stringify(this.state.chessBoard))
            this.isEnPassant(coordinates, updatedBoard)
            if(this.pawnMovedTwo(coordinates)) {
                piece.movedTwo = true
            }
            updatedBoard[piece.currentPosition].piece = null
            updatedBoard[coordinates].piece = piece
            piece.currentPosition = coordinates
            gameMoves.push(piece)
            this.setState({
                chessBoard: updatedBoard,
                moves: gameMoves,
                turn: this.updateTurn(),
                messageToUser: ''
            })
        } else {
            console.log('Invalid Move')
        }
        this.setState({
            selected: null
        })
    }

    pawnMovedTwo(coordinates) {
        return this.state.selected.type === 'pawn' &&
            Math.abs(parseInt(coordinates[1], 10) -
            parseInt(this.state.selected.currentPosition[1], 10)) === 2
    }

    isEnPassant(coordinates, updatedBoard) {
        let piece = this.state.selected
        if(coordinates[0] !== piece.currentPosition[0] &&
            !this.state.chessBoard[coordinates].piece &&
            piece.type === 'pawn') {
              updatedBoard[coordinates[0] + piece.currentPosition[1]].piece = null
        }
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
        fetch('http://localhost:8080/api/v1/users',
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
        fetch('http://localhost:8080/api/v1/authentication',
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
                let board = this.state.chessBoard
                let piece = board[id].piece
                let moveLogic = new MoveLogic()
                let gameMoves = this.state.moves

                let availableMoves = moveLogic.movesForPiece(piece, board, gameMoves).filter((move) => {
                    return this.isValid(piece, move, board, gameMoves)
                })

                piece.availableMoves = availableMoves
                this.setState({
                    selected: piece
                })
            } else if (this.state.selected === this.state.chessBoard[id].piece) {
                this.setState({
                    selected: null
                })
            }
        } else {
            console.log(`${this.state.turn}'s turn`)
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

    handleMoveLog() {
        this.setState({
          moveLogActive: !this.state.moveLogActive
        })
    }

    handleReset() {
        this.setState({
            chessBoard: JSON.parse(JSON.stringify(jsonChessBoard)),
            moves: [],
            turn: 'white'
        })
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

    get moveLog() {
      let moveLog
      if(this.state.moveLogActive) {
          moveLog = <MoveLog cancelMoveLog={this.handleMoveLog} moves={this.state.moves}/>
      } else {
          moveLog = <button onClick={this.handleMoveLog}>Move Log</button>
      }
      return moveLog
    }

    render() {
        return (
            <div className='App container-fluid'>
                {this.buttons}
                {this.signUpForm}
                {this.moveLog}
                <div className="user-header">
                    {this.state.messageToUser}
                    {this.state.hashedEmail !== '' ? <img src={`https://www.gravatar.com/avatar/${this.state.hashedEmail}`} alt="gravatar"/> : null}
                </div>

                <Board chessBoard={this.state.chessBoard}
                    handleSelected={this.handleSelected}
                    isSelected={this.state.selected}
                    move={this.move}
                />

                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}

export default App
