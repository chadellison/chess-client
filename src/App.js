import React, {Component} from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'
import MoveLogic from './helpers/MoveLogic'
import CrossedPawnMenu from './components/CrossedPawnMenu'
import SideBar from './components/SideBar'
import UserService from './services/UserService'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            chessBoard: JSON.parse(JSON.stringify(jsonChessBoard)),
            previousBoard: null,
            moves: [],
            selected: null,
            signUpFormActive: false,
            signInFormActive: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            token: '',
            loggedIn: false,
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
        this.handleFirstName      = this.handleFirstName.bind(this)
        this.handleLastName      = this.handleLastName.bind(this)
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

            updatedBoard = this.moveLogic.isCastle(piece, coordinates, updatedBoard)
            updatedBoard = this.moveLogic.isEnPassant(piece, coordinates, updatedBoard)
            piece = this.pawnMovedTwo(this.state.selected, coordinates)

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

    pawnMovedTwo(piece, coordinates) {
        if(piece.type === 'pawn' &&
            Math.abs(parseInt(coordinates[1], 10) -
            parseInt(this.state.selected.currentPosition[1], 10)) === 2) {
                piece.movedTwo = true
        }
        return piece
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
        this.userService.createUser(this.state.email, this.state.password, this.state.firstName, this.state.lastName)
           .then(response => response.json())
           .then(responseJson => {
              if (responseJson.errors) {
                  this.setState({
                      messageToUser: responseJson.errors,
                      signUpFormActive: true
                  })
              } else {
                  let message = `Great ${this.state.firstName}! Please check your email at ${this.state.email} to confirm your account!`
                  this.setState({
                      messageToUser: message,
                      signUpFormActive: false,
                      signInFormActive: false,
                      email: '',
                      password: '',
                      firstName: '',
                      lastName: ''
                  })
              }
           })
           .catch((error) => {
              alert(error)
           })
    }

    handleUserSignIn() {
        this.userService.signIn(this.state.email, this.state.password)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.errors) {
                    this.setState({
                      messageToUser: responseJson.errors
                    })
                } else {
                    this.setState({
                      token: responseJson.data.attributes.token,
                      signInFormActive: false,
                      signUpFormActive: false,
                      loggedIn: true,
                      messageToUser: 'Welcome to Chess Mail!',
                      hashedEmail: responseJson.data.attributes.hashed_email,
                      email: '',
                      password: '',
                      firstName: responseJson.data.attributes.firstName,
                      lastName: responseJson.data.attributes.lastName
                    })
                }
            })
            .catch((error) => {
               alert(error)
            })
    }

    handleSelected(selectedPiece) {
      if (this.state.chessBoard[selectedPiece.currentPosition].piece) {
          if (selectedPiece.color === this.state.turn) {
              if (!this.state.selected) {
                  let board = JSON.parse(JSON.stringify(this.state.chessBoard))
                  let piece = JSON.parse(JSON.stringify(selectedPiece))
                  let gameMoves = JSON.parse(JSON.stringify(this.state.moves))

                  let availableMoves = this.moveLogic.movesForPiece(piece, board, gameMoves).filter((move) => {
                      return this.isValid(piece, move, board, gameMoves)
                  })

                  piece.availableMoves = availableMoves
                  board[piece.currentPosition].piece = piece

                  this.setState({
                      selected: piece,
                      chessBoard: board
                  })
              }
          } else {
              this.setState({
                  messageToUser: `${this.state.turn}'s turn`
              })
          }
      }
      this.setState({
          previousBoard: null
      })
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

    handleFirstName(event) {
        this.setState({firstName: event.target.value})
    }
    handleLastName(event) {
        this.setState({lastName: event.target.value})
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
        let index = parseInt(event.target.id, 10)

        let gameMoves = this.state.moves.slice(0, index + 1)
        let board = JSON.parse(JSON.stringify(jsonChessBoard))

        board = this.moveLogic.setBoard(gameMoves, board)

        this.setState({
            previousBoard: board,
            selected: null
        })
    }

    handleReset() {
        this.setState({
            chessBoard: JSON.parse(JSON.stringify(jsonChessBoard)),
            previousBoard: null,
            moves: [],
            turn: 'white',
            messageToUser: '',
            checkmate: false,
            stalemate: false,
            selected: null,
            crossedPawn: false
        })
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

    get board() {
        if(this.state.previousBoard) {
            return this.state.previousBoard
        } else {
            return this.state.chessBoard
        }
    }

    render() {
        return (
            <div className='App'>
                <div className='container-fluid'>
                    <Board chessBoard={this.board}
                        handleSelected={this.handleSelected}
                        isSelected={this.state.selected}
                        move={this.move}
                        gameMoves={this.state.moves}
                    />
                    {this.crossedPawn}
                    <SideBar
                        signUpFormActive={this.state.signUpFormActive}
                        signInFormActive={this.state.signInFormActive}
                        handleUserEmail={this.handleUserEmail}
                        handleUserPassword={this.handleUserPassword}
                        handleFirstName={this.handleFirstName}
                        handleLastName={this.handleLastName}
                        handleCredentialForm={this.handleCredentialForm}
                        userEmail={this.state.email}
                        userPassword={this.state.password}
                        handleUserSignIn={this.handleUserSignIn}
                        handleUserSignUp={this.handleUserSignUp}
                        loggedIn={this.state.loggedIn}
                        moveLogActive={this.state.moveLogActive}
                        handleMoveLog={this.handleMoveLog}
                        moves={this.state.moves}
                        handlePreviousBoard={this.handlePreviousBoard}
                        messageToUser={this.state.messageToUser}
                        hashedEmail={this.state.hashedEmail}
                        handleReset={this.handleReset}
                        handleLogout={this.handleLogout}
                    />
                </div>
            </div>
        )
    }
}
