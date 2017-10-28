import React, { Component } from 'react'
import MiniSquare from './MiniSquare'
import jsonChessBoard from '../jsonChessBoard'
import '../styles/ThumbNail.css'
import MoveLogic from '../helpers/MoveLogic'
import GameService from '../services/GameService'
import LETTER_KEY from '../helpers/BoardHelper'
import { connect } from 'react-redux'
import {
  getMessageToUser,
  getMyGamesActive,
  getThumbnails,
  getMoves,
  getTurn,
  getPlayerColor,
  getCurrentGameActive,
  getCurrentGame,
  getChessBoard,
  getUserGames
} from '../actions/index'

class ThumbNail extends Component {
  constructor() {
    super()
    this.moveLogic = new MoveLogic()
    this.gameService = new GameService()

    this.handleCurrentGame     = this.handleCurrentGame.bind(this)
    this.refreshGame           = this.refreshGame.bind(this)
    this.handleAcceptChallenge = this.handleAcceptChallenge.bind(this)
    this.handleArchiveGame     = this.handleArchiveGame.bind(this)
  }

  handleAcceptChallenge(game_id) {
    this.gameService.acceptGame(game_id, this.props.token)
      .then(response => response.status)
      .then(responseStatus => this.handleAcceptChallengeJsonResponse(responseStatus))
      .catch((error) => alert(error))
  }

  handleAcceptChallengeJsonResponse(responseStatus) {
    if (responseStatus === 204) {
      this.gameService.fetchGames(this.props.token, this.props.page)
      .then(response => response.json())
      .then(responseJson => {
        this.props.dispatch(getUserGames(responseJson.data))
      })
    }
  }

  handleArchiveGame(game_id) {
    this.gameService.archiveGame(game_id, this.props.token)
    .then(response => response.status)
    .then(responseStatus => {
      if (responseStatus === 204 || responseStatus === 404) {
        let updatedUserGames = this.props.userGames.filter((userGame) => {
          return userGame.id !== game_id
        })

        this.props.dispatch(getUserGames(updatedUserGames))
      }
    })
    .catch((error) => alert(error))
  }

  handleCurrentGame(game) {
    if (game.attributes.pending) {
      if (game.attributes.isChallenger) {
        this.props.dispatch(getMessageToUser(`${game.attributes.opponentName} has not yet accepted your challenge.`))
      } else {
        this.props.dispatch(getMessageToUser(`Awaiting your acceptance from ${game.attributes.opponentName}.`))
      }
    } else {
      this.refreshGame(game)
    }
  }

  refreshGame(game) {
    let board = JSON.parse(JSON.stringify(jsonChessBoard))
    let gameMoves = game.included.map((piece) => {
      return {
        color: piece.attributes.color,
        type: piece.attributes.pieceType,
        currentPosition: piece.attributes.currentPosition,
        startIndex: piece.attributes.startIndex,
        hasMoved: piece.attributes.hasMoved,
        movedTwo: piece.attributes.movedTwo
      }
    })

    let turn = gameMoves.length % 2 === 0 ? 'white' : 'black'
    let currentGameBoard = this.moveLogic.setBoard(gameMoves, board)

    this.props.dispatch(getMyGamesActive(false))
    this.props.dispatch(getThumbnails(false))
    this.props.dispatch(getMoves(gameMoves))
    this.props.dispatch(getTurn(turn))
    this.props.dispatch(getPlayerColor(game.attributes.playerColor))
    this.props.dispatch(getCurrentGameActive(true))
    this.props.dispatch(getCurrentGame(game))
    this.props.dispatch(getChessBoard(currentGameBoard))
  }

  thumbNailBoard() {
    let board = JSON.parse(JSON.stringify(jsonChessBoard))
    let gameMoves = this.props.game.included.map((piece) => {
      return {
        color: piece.attributes.color,
        type: piece.attributes.pieceType,
        currentPosition: piece.attributes.currentPosition,
        startIndex: piece.attributes.startIndex,
        hasMoved: piece.attributes.hasMoved,
        movedTwo: piece.attributes.movedTwo
      }
    })

    return this.moveLogic.setBoard(gameMoves, board)
  }

  boardRows() {
    let index = 0
    let boardToArray = Object.keys(this.thumbNailBoard())

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

  get gravatar() {
    if (this.props.game.attributes.human) {
      return <img className='opponentGravatar' src={`https://www.gravatar.com/avatar/${this.props.game.attributes.opponentGravatar}`} alt='gravatar'/>
    } else {
      return <img className='opponentGravatar' src={`https://robohash.org/${this.props.game.attributes.opponentGravatar}`} alt='gravatar'/>
    }
  }


  get currentSetup() {
    return this.boardRows().map((row, rowIndex) => {
      let eachRow = row.map((square, columnIndex) => {
        return(
          <MiniSquare key={columnIndex}
            color={this.squareColor(square)}
            piece={this.thumbNailBoard()[square].piece}
            playerColor={this.playerColor}
          />
        )
      })
      return <div key={rowIndex} className="row">{eachRow}</div>
    })
  }

  get status() {
    if (this.props.game.attributes.pending) {
      if (this.props.game.attributes.pending && !this.props.game.attributes.isChallenger) {
        return (
          <a className='acceptChallenge' onClick={() => this.handleAcceptChallenge(this.props.game.id)}>
            Accept Challenge
          </a>)
      } else {
        return 'Status: Pending'
      }
    } else if (this.props.game.attributes.outcome) {
      return 'Status: Game Over'
    } else {
      return 'Status: Active'
    }
  }

  get gameState() {
    if (this.props.game.attributes.outcome) {
      return this.props.game.attributes.outcome
    } else {
      let color = this.props.game.included.length % 2 === 0 ? 'White' : 'Black'
      return `${color} to move`
    }
  }

  get playerColor() {
    return this.props.game.attributes.playerColor === 'black' ? 'blackPlayer' : ''
  }

  get archive() {
    if (this.props.game.attributes.pending) {
      return (
        <button className='archiveButton' onClick={() => this.handleArchiveGame(this.props.game.id)}>
          Cancel Game
        </button>
      )
    } else if (this.props.game.attributes.outcome) {
      return (
        <button className='archiveButton' onClick={() => this.handleArchiveGame(this.props.game.id)}>
          Archive
        </button>
      )
    } else {
      let outcome = this.props.game.attributes.playerColor === 'white' ? 'black wins' : 'white wins'
      return (
        <button className='archiveButton' onClick={() => this.props.handleEndGame(outcome, true, this.props.game.id)}>
          Resign
        </button>
      )
    }
  }

  render() {
    return(
      <div className='thumbNail'>
        <p className='gameData'>
          Opponent: {this.props.game.attributes.opponentName}
          <br></br>
          {this.gravatar}
          <br></br>
          {this.status}
          <br></br>
          {this.gameState}
        </p>
        <div id={this.props.game.id}
          className={`thumbNailBoard ${this.playerColor}`}
          onClick={() => this.handleCurrentGame(this.props.game)}>
            {this.currentSetup}
        </div>
        {this.archive}
      </div>
    )
  }
}

const mapStateToProps = ({
  selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
  moves, checkmate, stalemate, crossedPawn, userGames, currentGame, token, page
}) => {
  return {
    selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
    moves, checkmate, stalemate, crossedPawn, userGames, currentGame, token, page
  }
}

export default connect(mapStateToProps)(ThumbNail)
