import React, {Component} from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'
import MoveLogic from './helpers/MoveLogic'
import MoveLog from './components/MoveLog'
import CredentialForm from './components/CredentialForm'
import CrossedPawnMenu from './components/CrossedPawnMenu'
import UserService from './services/UserService'

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
            moveLogActive: false,
            checkmate: false,
            stalemate: false,
            crossedPawn: false
        }
        this.userService = new UserService()
        this.moveLogic   = new MoveLogic()

        this.handleSelected       = this.handleSelected.bind(this)
        this.handleCredentialForm = this.handleCredentialForm.bind(this)
        this.handleUserEmail      = this.handleUserEmail.bind(this)
        this.handleUserPassword   = this.handleUserPassword.bind(this)
        this.handleUserSignIn     = this.handleUserSignIn.bind(this)
        this.handleUserSignUp     = this.handleUserSignUp.bind(this)
        this.handleLogout         = this.handleLogout.bind(this)
        this.move                 = this.move.bind(this)
        this.handleReset          = this.handleReset.bind(this)
        this.handleMoveLog        = this.handleMoveLog.bind(this)
        this.handleCrossedPawn    = this.handleCrossedPawn.bind(this)
        this.handlePreviousBoard  = this.handlePreviousBoard.bind(this)
    }

    isValid(piece, coordinates, board, gameMoves) {
        return (this.moveLogic.validMove(piece, coordinates, board, gameMoves) &&
            this.moveLogic.kingIsSafe(piece, coordinates, board, gameMoves)
        )
    }

    move(coordinates) {
        let piece = JSON.parse(JSON.stringify(this.state.selected))
        let board = JSON.parse(JSON.stringify(this.state.chessBoard))
        let gameMoves = JSON.parse(JSON.stringify(this.state.moves))

        if(this.isValid(piece, coordinates, board, gameMoves)) {
            let updatedBoard = JSON.parse(JSON.stringify(this.state.chessBoard))
            let checkmate = this.state.checkmate
            let stalemate = this.state.stalemate
            let messageToUser = ''
            let crossedPawn = false
            let color = this.state.turn === 'white' ? 'black' : 'white'

            piece = this.state.selected
            this.isCastle(piece, coordinates, updatedBoard)
            this.isEnPassant(coordinates, updatedBoard)
            if(this.pawnMovedTwo(coordinates)) {
                piece.movedTwo = true
            }

            if(piece.type === 'pawn' && (coordinates[1] === '1' || coordinates[1] === '8')) {
                crossedPawn = true
            }

            updatedBoard[piece.currentPosition].piece = null

            updatedBoard[coordinates].piece = piece
            piece.currentPosition = coordinates
            piece.hasMoved = true
            gameMoves.push(piece)

            if(this.moveLogic.checkmate(updatedBoard, gameMoves, color)) {
                checkmate = true
                messageToUser = `${this.state.turn} Wins!`
            }

            if(this.moveLogic.stalemate(updatedBoard, gameMoves, color)) {
                stalemate = true
                messageToUser = 'Draw!'
            }

            this.setState({
                chessBoard: updatedBoard,
                moves: gameMoves,
                turn: this.currentTurn(),
                checkmate: checkmate,
                stalemate: stalemate,
                messageToUser: messageToUser,
                selected: null,
                crossedPawn: crossedPawn
            })
        } else {
            this.setState({
                messageToUser: 'Invalid Move',
                selected: null
            })
        }
    }

    isCastle(piece, coordinates, updatedBoard) {
        if(piece.type === 'king' && piece.currentPosition[0] === 'e' && ['c', 'g'].includes(coordinates[0])) {
            let oldColumn
            let newColumn

            if (piece.currentPosition[0] > coordinates[0]) {
                oldColumn = 'a'
                newColumn = 'd'
            } else {
                oldColumn = 'h'
                newColumn = 'f'
            }
            let rook = updatedBoard[oldColumn + coordinates[1]].piece

            rook.currentPosition = (newColumn + coordinates[1])
            updatedBoard[oldColumn + coordinates[1]].piece = null
            updatedBoard[newColumn + coordinates[1]].piece = rook
        }
    }

    isEnPassant(coordinates, updatedBoard) {
        let piece = this.state.selected
        if(coordinates[0] !== piece.currentPosition[0] &&
            !this.state.chessBoard[coordinates].piece &&
            piece.type === 'pawn') {
              updatedBoard[coordinates[0] + piece.currentPosition[1]].piece = null
        }
    }

    pawnMovedTwo(coordinates) {
        return this.state.selected.type === 'pawn' &&
            Math.abs(parseInt(coordinates[1], 10) -
            parseInt(this.state.selected.currentPosition[1], 10)) === 2
    }

    currentTurn() {
        return this.state.turn === 'white' ? 'black' : 'white'
    }

    handleCrossedPawn(event) {
        let classNames = event.target.className.split("-")
        let pieceType

        if (classNames.includes('knight piece')) {
            pieceType = 'knight'
        }
        if (classNames.includes('bishop piece')) {
            pieceType = 'bishop'
        }

        if (classNames.includes('tower piece')) {
            pieceType = 'rook'
        }
        if (classNames.includes('queen piece')) {
            pieceType = 'queen'
        }

        let coordinates = this.state.moves.slice(-1)[0].currentPosition
        let board = JSON.parse(JSON.stringify(this.state.chessBoard))
        board[coordinates].piece.type = pieceType

        this.setState({
            chessBoard: board,
            crossedPawn: false
        })
    }

    handleUserSignUp() {
        this.userService.createUser(this.state.email, this.state.password)
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
        this.userService.signIn(this.state.email, this.state.password)
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
                let board = JSON.parse(JSON.stringify(this.state.chessBoard))
                let piece = JSON.parse(JSON.stringify(board[id].piece))
                let gameMoves = JSON.parse(JSON.stringify(this.state.moves))

                let availableMoves = this.moveLogic.movesForPiece(piece, board, gameMoves).filter((move) => {
                    return this.isValid(piece, move, board, gameMoves)
                })

                piece.availableMoves = availableMoves
                board[id].piece = piece

                this.setState({
                    selected: piece,
                    chessBoard: board
                })
            } else if (this.state.selected === this.state.chessBoard[id].piece) {
                this.setState({
                    selected: null
                })
            }
        } else {
            this.setState({
                messageToUser: `${this.state.turn}'s turn`
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
                messageToUser: '',
                email: '',
                password: ''
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

    handlePreviousBoard(event) {
        console.log("hi")
    }

    handleReset() {
        this.setState({
            chessBoard: JSON.parse(JSON.stringify(jsonChessBoard)),
            moves: [],
            turn: 'white',
            messageToUser: '',
            checkmate: false,
            stalemate: false,
            selected: null,
            crossedPawn: false
        })
    }

    get signUpForm() {
        if (this.state.signUpFormActive || this.state.signInFormActive) {
            return <CredentialForm
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
            buttons = <button className='logOutButton' onClick={this.handleLogout}>Logout</button>
        } else {
            buttons = (
                <div>
                    <button className='signInButton' onClick={this.handleCredentialForm}>Sign In</button>
                    <button className='signUpButton' onClick={this.handleCredentialForm}>Sign Up</button>
                </div>
            )
        }
        return buttons
    }

    get moveLog() {
      let moveLog
      if(this.state.moveLogActive) {
          moveLog = <MoveLog
              cancelMoveLog={this.handleMoveLog}
              moves={this.state.moves}
              handlePreviousBoard={this.handlePreviousBoard}
          />
      } else {
          moveLog = <button className='moveLogButton' onClick={this.handleMoveLog}>
              Move Log
          </button>
      }
      return moveLog
    }

    get crossedPawn() {
        let crossedPawn
        if (this.state.crossedPawn) {
            crossedPawn = <CrossedPawnMenu
                color={this.state.moves.slice(-1)[0].color}
                handleCrossedPawn={this.handleCrossedPawn}
            />
        }
        return crossedPawn
    }

    render() {
        return (
            <div className='App'>
                <div className='row container-fluid'>
                    <Board chessBoard={this.state.chessBoard}
                        handleSelected={this.handleSelected}
                        isSelected={this.state.selected}
                        move={this.move}
                        gameMoves={this.state.moves}
                    />
                    {this.crossedPawn}
                    <div className='sideBar col-xs-2'>
                        {this.buttons}
                        {this.signUpForm}
                        {this.state.messageToUser}
                        {this.moveLog}
                        <div className='user-header'>
                            {this.state.hashedEmail !== '' ? <img src={`https://www.gravatar.com/avatar/${this.state.hashedEmail}`} alt="gravatar"/> : null}
                        </div>
                        <button className='resetButton' onClick={this.handleReset}>Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
