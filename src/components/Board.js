import React, { Component } from 'react'
import '../styles/Board.css'
import Square from './Square'
import MoveLogic from '../helpers/MoveLogic'
import LETTER_KEY from '../helpers/BoardHelper'
import deserialize from '../helpers/Deserializer'
import GameService from '../services/GameService'
import CrossedPawnMenu from './CrossedPawnMenu'
import moveAudio from '../audio/moveAudio.wav'
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
  getTurn,
  getChartData,
  getLoading,
  setAiGameId
} from '../actions/index'

class Board extends Component {
  constructor() {
    super()
    this.moveLogic   = new MoveLogic()
    this.gameService = new GameService()
    this.moveAudio   = new Audio(moveAudio)

    this.move              = this.move.bind(this)
    this.isValid           = this.isValid.bind(this)
    this.sendMove          = this.sendMove.bind(this)
    this.handleWatchRobots = this.handleWatchRobots.bind(this)
  }

  move(coordinates) {
    let piece     = JSON.parse(JSON.stringify(this.props.selected))
    let board     = JSON.parse(JSON.stringify(this.props.chessBoard))
    let gameMoves = JSON.parse(JSON.stringify(this.props.moves))

    if(piece.type === 'pawn' && (coordinates[1] === '1' || coordinates[1] === '8') &&
      this.isValid(piece, coordinates, board, gameMoves)) {
        this.moveAudio.play()
        this.props.dispatch(getCrossedPawn(true))
        this.updateBoardAndPiece(coordinates, piece, board, gameMoves)
    } else if(this.isValid(piece, coordinates, board, gameMoves)) {
      this.moveAudio.play()
      this.props.dispatch(getTurn(this.props.turn))

      piece.notation = this.moveLogic.createNotation(piece, coordinates, board, gameMoves)

      this.props.dispatch(getChessBoard(this.moveLogic.isCastle(piece, coordinates, board)))
      this.props.dispatch(getChessBoard(this.moveLogic.isEnPassant(piece, coordinates, board)))

      piece = this.pawnMovedTwo(piece, coordinates)

      this.updateBoardAndPiece(coordinates, piece, board, gameMoves)
      this.updateAnalytics(gameMoves.map((move) => move.notation))
      this.sendMove(piece)
      let turn = this.props.turn === 'white' ? 'black' : 'white'

      if(this.moveLogic.checkmate(board, gameMoves, turn) || this.moveLogic.stalemate(board, gameMoves, turn)) {
        this.handleCheckmateOrStaleMate(board, gameMoves, turn)
      } else {
        this.props.dispatch(getMessageToUser(''))
      }
      this.props.dispatch(getTurn(turn))
    } else {
      if (!this.props.checkmate && !this.props.stalemate) {
        this.props.dispatch(getMessageToUser('Invalid Move'))
      }
    }
    this.props.dispatch(getSelected(null))
  }

  sendMove(piece) {
    if(this.props.currentGameActive) {
      this.props.dispatch(getLoading(true))
      this.gameService.makeMove(this.props.currentGame.id, piece, this.props.token)
      .then((response) => response.json())
      .then((responseJson) => {
        let updatedUserGames = this.props.userGames.map((userGame) => {
          if(userGame.id === responseJson.data.id) {
            userGame.included = responseJson.data.included
          }
          return userGame
        })
        this.updateAnalytics(responseJson.data.included.moves.map((move) => move.attributes.notation))
        this.props.dispatch(getUserGames(updatedUserGames))
      })
      .then(() => {
        if (this.props.currentGame.attributes.robot) {
          this.aiMove(this.props.currentGame)
        }
        this.props.dispatch(getLoading(false))
      })
      .catch((error) => alert(error))
    }
  }

  updateAnalytics(notation) {
    if(this.props.analyticsChartActive) {
      this.gameService.fetchAnalytics(notation)
      .then(response => response.json())
      .then(responseJson => {
        let chartData = [
          { value: parseInt(responseJson.data.attributes.whiteWins, 10), color: '#cd853f' },
          { value: parseInt(responseJson.data.attributes.blackWins, 10), color: '#8b4513' },
          { value: parseInt(responseJson.data.attributes.draws, 10), color: '#7d8ca3' }
        ]
        this.props.dispatch(getChartData(chartData))
      })
      .catch((error) => alert(error))
    }
  }

  aiMove(game) {
    let gamePieces = game.included.pieces.map((piece) => deserialize(piece))
    let gameMoves = game.included.moves.map((move) => deserialize(move))
    let turn = gameMoves.length % 2 === 0 ? 'white' : 'black'
    let currentGameBoard = this.moveLogic.setPieces(gamePieces)
    this.moveAudio.play()
    this.props.dispatch(getMoves(gameMoves))
    this.props.dispatch(getTurn(turn))
    this.props.dispatch(getChessBoard(currentGameBoard))
  }

  updateBoardAndPiece(coordinates, piece, board, gameMoves) {
    board[piece.currentPosition].piece = null
    board[coordinates].piece = piece
    this.props.dispatch(getChessBoard(board))
    this.props.dispatch(getSelected(this.updatedPiece(piece, coordinates)))
    gameMoves.push(piece)
    this.props.dispatch(getMoves(gameMoves))
  }

  handleCheckmateOrStaleMate(updatedBoard, gameMoves, turn) {
    let outcome

    if(this.moveLogic.stalemate(updatedBoard, gameMoves, turn)) {
      this.props.dispatch(getStalemate(true))
      this.props.dispatch(getMessageToUser('Draw!'))
      outcome = 'draw'
    }
    if(this.moveLogic.checkmate(updatedBoard, gameMoves, turn)) {
      this.props.dispatch(getCheckmate(true))
      this.props.dispatch(getMessageToUser(`${this.props.turn} Wins!`))
      outcome = `${this.props.turn} wins`
    }

    if(this.props.currentGameActive) {
      this.updateOutcome(outcome)
    }
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

  currentBoard() {
    if(this.props.previousBoard) {
      return this.props.previousBoard
    } else {
      return this.props.chessBoard
    }
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
    if (this.props.currentGameActive && this.props.currentGame.attributes.playerColor === 'black') {
      boardToArray = boardToArray.reverse()
    }

    return Array.apply(null, { length: 8}).map(() => {
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

  handleWatchRobots() {
    this.gameService.createAiGame()
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.errors) {
          this.props.dispatch(getMessageToUser('The robots were unable to play'))
        } else {
          this.props.dispatch(setAiGameId(responseJson.data.id))
          this.robotsPlay()
          this.props.dispatch(getMessageToUser('Robot vs Robot'))
        }
      })
      .catch((error) => alert(error))
  }

  robotsPlay() {
    if(this.props.aiGameId) {
      this.gameService.fetchAiMove(this.props.moves.map((move) => move.notation), this.props.aiGameId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.aiMove(responseJson.data)
        let chessBoard = JSON.parse(JSON.stringify(this.props.chessBoard))
        let gameMoves = JSON.parse(JSON.stringify(this.props.moves))
        let color = JSON.parse(JSON.stringify(this.props.turn))

        this.updateAnalytics(gameMoves.map((move) => move.notation))

        if(this.moveLogic.checkmate(chessBoard, gameMoves, color)) {
          let message = color === 'white' ? 'Black Wins!' : 'White Wins!'
          this.props.dispatch(getMessageToUser(message))
          this.props.dispatch(setAiGameId(null))
        } else if(this.moveLogic.stalemate(chessBoard, gameMoves, color)) {
          this.props.dispatch(getMessageToUser('Draw by stalemate'))
          this.props.dispatch(setAiGameId(null))
        } else if(this.props.moves.length > 200) {
          this.props.dispatch(getMessageToUser('Draw by agreement'))
          this.props.dispatch(setAiGameId(null))
        } else {
          this.robotsPlay()
        }
      })
      .catch((error) => alert(error))
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
          />
        )
      })
    return <div key={rowIndex} className="row">{eachRow}</div>
    })
  }

  get crossedPawnMenu() {
    if (this.props.crossedPawn) {
      return <CrossedPawnMenu color={this.props.moves.slice(-1)[0].color} sendMove={this.sendMove}/>
    } else {
      return null
    }
  }

  get opacity() {
    if (this.props.crossedPawn) {
      return 'opaque'
    } else {
      return ''
    }
  }

  get watchRobotsPlay() {
    if (this.props.loggedIn || this.props.aiGameId) {
      return null
    } else {
      return <button className='watchRobots btn-warning' onClick={this.handleWatchRobots}>Watch Robots Play</button>
    }
  }

  render() {
    return(
      <div>
        {this.crossedPawnMenu}
        <div id='chessBoard' className={`col-md-9 col-xs-12 container ${this.opacity}`}>
          {this.currentSetup}
          {this.watchRobotsPlay}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
  moves, checkmate, stalemate, crossedPawn, userGames, currentGame, token,
  previousBoard, chartData, analyticsChartActive, loggedIn, aiGameId
}) => {
  return {
    selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
    moves, checkmate, stalemate, crossedPawn, userGames, currentGame, token,
    previousBoard, chartData, analyticsChartActive, loggedIn, aiGameId
  }
}

export default connect(mapStateToProps)(Board)
