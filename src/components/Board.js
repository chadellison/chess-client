import React, { Component } from 'react'
import '../styles/Board.css'
import Square from './Square'
import MoveLogic from '../helpers/MoveLogic'
import LETTER_KEY from '../helpers/BoardHelper'
import GameService from '../services/GameService'
import { connect } from 'react-redux'
import {
  getSelected,
  getChessBoard,
  getMessageToUser,
  getPreviousBoard,
  getCheckmate,
  getStalemate,
  getCrossedPawn,
  getUserGames,
  getMoves,
  getTurn
} from '../actions/index'

class Board extends Component {
  constructor() {
    super()
    this.moveLogic = new MoveLogic()
    this.gameService = new GameService()

    this.handleSelected = this.handleSelected.bind(this)
    this.move = this.move.bind(this)
  }

  move(coordinates) {
    let piece     = JSON.parse(JSON.stringify(this.props.selected))
    let board     = JSON.parse(JSON.stringify(this.props.chessBoard))
    let gameMoves = JSON.parse(JSON.stringify(this.props.moves))

    if(this.isValid(piece, coordinates, board, gameMoves)) {
      this.props.dispatch(getTurn(this.props.turn))
      let updatedBoard     = JSON.parse(JSON.stringify(this.props.chessBoard))
      let checkmate        = this.props.checkmate
      let stalemate        = this.props.stalemate
      // let messageToUser    = ''
      let crossedPawn      = false
      // let color            = this.props.turn === 'white' ? 'black' : 'white'
      let updatedUserGames = this.props.userGames

      updatedBoard = this.moveLogic.isCastle(piece, coordinates, updatedBoard)
      updatedBoard = this.moveLogic.isEnPassant(piece, coordinates, updatedBoard)
      piece        = this.pawnMovedTwo(this.props.selected, coordinates)
      // this.props.dispatch(getSelected(this.pawnMovedTwo(this.props.piece, coordinates)))

      if(piece.type === 'pawn' && (coordinates[1] === '1' || coordinates[1] === '8')) {
        this.props.dispatch(getCrossedPawn(true))
      }

      updatedBoard[piece.currentPosition].piece = null

      updatedBoard[coordinates].piece = piece
      this.props.dispatch(getSelected(this.updatedPiece(piece, coordinates)))
      // gameMoves.push(piece)
      this.props.dispatch(getMoves(gameMoves.push(piece)))

      this.props.dispatch(getChessBoard(updatedBoard))

      if(this.props.currentGameActive) {
        this.gameService.makeMove(this.props.currentGame.id, piece, this.state.token)
        .then((response) => response.json())
        .then((responseJson) => {
          updatedUserGames = updatedUserGames.map((userGame) => {
            if(userGame.id === responseJson.data.id) {
              userGame.included = responseJson.data.included
            }
            return userGame
          })
        })
        .catch((error) => alert(error))
      }

      if(this.moveLogic.checkmate(updatedBoard, gameMoves, this.props.turn)) {
        checkmate = true
        // messageToUser = `${this.props.turn} Wins!`
        this.props.dispatch(getMessageToUser(`${this.props.turn} Wins!`))
        if(this.props.currentGameActive) {
          let outcome = `${this.props.turn} wins`
          this.gameService.endGame(outcome, false, this.props.currentGame.id, this.props.token)
          .then((response) => response.json())
          .then((responseJson) => {
            updatedUserGames = updatedUserGames.map((userGame) => {
              if(userGame.id === responseJson.data.id) {
                userGame.attributes.outcome = outcome
              }
              return userGame
            })
          })
        }
      }

      if(this.moveLogic.stalemate(updatedBoard, gameMoves, this.props.turn)) {
        stalemate = true
        // messageToUser = 'Draw!'
        this.props.dispatch(getMessageToUser('Draw!'))
        if(this.props.currentGameActive) {
          this.gameService.endGame('draw', false, this.props.currentGame.id, this.state.token)
          .then((response) => response.json())
          .then((responseJson) => {
            updatedUserGames = updatedUserGames.map((userGame) => {
              if(userGame.id === responseJson.data.id) {
                userGame.attributes.outcome = 'draw'
              }
              return userGame
            })
          })
        }
      }

      // this.setState({
      //   // chessBoard: updatedBoard,
      //   moves: gameMoves,
      //   // turn: color,
      //   checkmate: checkmate,
      //   stalemate: stalemate,
      //   // messageToUser: messageToUser,
      //   selected: null,
      //   crossedPawn: crossedPawn,
      //   userGames: updatedUserGames
      // })
      this.props.dispatch(getMoves(gameMoves))
      this.props.dispatch(getCheckmate(checkmate))
      this.props.dispatch(getStalemate(stalemate))
      this.props.dispatch(getUserGames(updatedUserGames))

    } else {
      this.props.dispatch(getMessageToUser('Invalid Move'))
      // this.setState({
        // messageToUser: 'Invalid Move',
      //   selected: null
      // })
    }
    this.props.dispatch(getSelected(null))
  }

  updatedPiece(piece, coordinates) {
    // don't mutate directly
    piece.currentPosition = coordinates
    piece.hasMoved = true

    return piece
  }

  pawnMovedTwo(piece, coordinates) {
    // don't mutate directly
    if(piece.type === 'pawn' &&
      Math.abs(parseInt(coordinates[1], 10) -
      parseInt(this.props.selected.currentPosition[1], 10)) === 2) {
        piece.movedTwo = true
    }
    return piece
  }

  isValid(piece, coordinates, board, gameMoves) {
    return (this.moveLogic.validMove(piece, coordinates, board, gameMoves) &&
      this.moveLogic.kingIsSafe(piece, coordinates, board, gameMoves)
    )
  }

  handleSelected(selectedPiece) {
    if (this.props.chessBoard[selectedPiece.currentPosition].piece) {
      if (selectedPiece.color === this.props.turn) {
        if (!this.props.selected) {
          if (this.props.currentGameActive && this.props.playerColor !== this.props.turn) {
            this.props.dispatch(getMessageToUser(`You may only move the ${this.props.playerColor} pieces`))
          } else {
            let board = JSON.parse(JSON.stringify(this.props.chessBoard))
            let piece = JSON.parse(JSON.stringify(selectedPiece))
            let gameMoves = JSON.parse(JSON.stringify(this.props.moves))

            let availableMoves = this.moveLogic.movesForPiece(piece, board, gameMoves).filter((move) => {
              return this.isValid(piece, move, board, gameMoves)
            })

            piece.availableMoves = availableMoves
            board[piece.currentPosition].piece = piece

            this.props.dispatch(getSelected(piece))
            // this.setState({
            //   selected: piece,
            //   chessBoard: board
            // })
            this.props.dispatch(getSelected(piece))
            this.props.dispatch(getChessBoard(board))
          }
        }
      } else {
        this.props.dispatch(getMessageToUser(`${this.props.turn}'s turn`))
      }
    }
    this.props.dispatch(getPreviousBoard(null))
    // this.setState({
    //   previousBoard: null
    // })
  }

  get playerColor() {
    if (this.props.currentGameActive && this.props.currentGame.attributes.playerColor === 'black') {
      return 'blackPlayer'
    } else {
      return ''
    }
  }

  get currentSetup() {
    return this.boardRows().map((row, rowIndex) => {
      let eachRow = row.map((square, columnIndex) => {
        return(
          <Square key={columnIndex}
            styles={`col-xs-1 square${this.setOffset(columnIndex)} ${this.squareColor(square)}`}
            piece={this.props.chessBoard[square].piece}
            handleSelected={this.handleSelected}
            isSelected={this.props.selected}
            id={square}
            move={this.move}
            playerColor={this.playerColor}
          />
        )
      })
    return <div key={rowIndex} className="row">{eachRow}</div>
    })
  }

  setOffset(index) {
    if(index % 8 === 0) {
      return ' col-xs-offset-2'
    } else {
      return ''
    }
  }

  boardRows() {
    let index = 0
    let boardToArray = Object.keys(this.props.chessBoard)

    return Array.apply(null, {length: 8}).map(() => {
      return boardToArray.slice(index, index += 8)
    })
  }

  squareColor(id) {
    let sum = id.split('').reduce((value, character) => {
      if(LETTER_KEY[character]) {
        character = LETTER_KEY[character]
      }
      return value + parseInt(character, 10)
    }, 0)

    return sum % 2 === 0 ? 'white' : 'black'
  }

  render() {
    return <div id='chessBoard' className={`col-md-9 col-xs-12 row ${this.playerColor}`}>
      {this.currentSetup}
    </div>
  }
}

const mapStateToProps = ({
  selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
  moves, checkmate, stalemate, crossedPawn, userGames, currentGame
}) => {
  return {
    selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
    moves, checkmate, stalemate, crossedPawn, userGames, currentGame
  }
}

export default connect(mapStateToProps)(Board)
