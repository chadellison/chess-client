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

    this.move = this.move.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  move(coordinates) {
    let piece     = JSON.parse(JSON.stringify(this.props.selected))
    let board     = JSON.parse(JSON.stringify(this.props.chessBoard))
    let gameMoves = JSON.parse(JSON.stringify(this.props.moves))

    if(this.isValid(piece, coordinates, board, gameMoves)) {
      this.props.dispatch(getTurn(this.props.turn))
      let updatedBoard     = JSON.parse(JSON.stringify(this.props.chessBoard))

      this.props.dispatch(getChessBoard(this.moveLogic.isCastle(piece, coordinates, updatedBoard)))
      this.props.dispatch(getChessBoard(this.moveLogic.isEnPassant(piece, coordinates, updatedBoard)))
      piece        = this.pawnMovedTwo(this.props.selected, coordinates)

      if(piece.type === 'pawn' && (coordinates[1] === '1' || coordinates[1] === '8')) {
        this.props.dispatch(getCrossedPawn(true))
      }

      this.updateBoardAndPiece(coordinates, piece)
      this.sendMove()

      updatedBoard = this.props.chessBoard
      if(this.moveLogic.checkmate(updatedBoard, this.props.moves, this.props.turn) || this.moveLogic.stalemate(updatedBoard, this.props.moves, this.props.turn)) {
        this.handleCheckmateOrStaleMate(updatedBoard)
      }

      this.props.dispatch(getTurn(this.props.turn === 'white' ? 'black' : 'white'))
      this.props.dispatch(getMoves(gameMoves))
      this.props.dispatch(getChessBoard(updatedBoard))

    } else {
      this.props.dispatch(getMessageToUser('Invalid Move'))
    }
    this.props.dispatch(getSelected(null))
  }

  sendMove() {
    if(this.props.currentGameActive) {
      this.gameService.makeMove(this.props.currentGame.id, this.props.selected, this.props.token)
      .then((response) => response.json())
      .then((responseJson) => {
        let updatedUserGames = this.props.userGames.map((userGame) => {
          if(userGame.id === responseJson.data.id) {
            userGame.included = responseJson.data.included
          }
          return userGame
        })
        this.props.dispatch(getUserGames(updatedUserGames))
      })
      .catch((error) => alert(error))
    }
  }

  updateBoardAndPiece(coordinates, piece) {
    let updatedBoard = this.props.chessBoard
    let gameMoves = this.props.moves
    updatedBoard[piece.currentPosition].piece = null
    updatedBoard[coordinates].piece = piece
    this.props.dispatch(getChessBoard(updatedBoard))
    this.props.dispatch(getSelected(this.updatedPiece(piece, coordinates)))
    this.props.dispatch(getMoves(gameMoves.push(piece)))
  }

  handleCheckmateOrStaleMate(updatedBoard) {
    let outcome

    if(this.moveLogic.stalemate(updatedBoard, this.props.moves, this.props.turn)) {
      this.props.dispatch(getStalemate(true))
      this.props.dispatch(getMessageToUser('Draw!'))
      outcome = 'draw'
    }
    if(this.moveLogic.checkmate(updatedBoard, this.props.moves, this.props.turn)) {
      this.props.dispatch(getCheckmate(true))
      this.props.dispatch(getMessageToUser(`${this.props.turn} Wins!`))
      outcome = `${this.props.turn} wins`
    }

    this.updateOutcome(outcome)
  }

  updateOutcome(outcome) {
    this.gameService.endGame(outcome, false, this.props.currentGame.id, this.props.token)
    .then((response) => response.json())
    .then((responseJson) => {
      let updatedUserGames = this.props.userGames.map((userGame) => {
        if(userGame.id === responseJson.data.id) {
          userGame.attributes.outcome = outcome
        }
        return userGame
      })
      this.props.dispatch(getUserGames(updatedUserGames))
    })
  }

  updatedPiece(piece, coordinates) {
    piece.currentPosition = coordinates
    piece.hasMoved = true

    return piece
  }

  pawnMovedTwo(piece, coordinates) {
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

  get playerColor() {
    if (this.props.currentGameActive && this.props.currentGame.attributes.playerColor === 'black') {
      return 'blackPlayer'
    } else {
      return ''
    }
  }

  currentBoard() {
    if(this.props.previousBoard) {
      return this.props.previousBoard
    } else {
      return this.props.chessBoard
    }
  }

  get currentSetup() {
    return this.boardRows().map((row, rowIndex) => {
      let eachRow = row.map((square, columnIndex) => {
        return(
          <Square key={columnIndex}
            styles={`col-xs-1 square${this.setOffset(columnIndex)} ${this.squareColor(square)}`}
            piece={this.currentBoard()[square].piece}
            id={square}
            isValid={this.isValid}
            move={this.move}
            colorOfPlayer={this.playerColor}
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
  moves, checkmate, stalemate, crossedPawn, userGames, currentGame, token,
  previousBoard
}) => {
  return {
    selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
    moves, checkmate, stalemate, crossedPawn, userGames, currentGame, token,
    previousBoard
  }
}

export default connect(mapStateToProps)(Board)
