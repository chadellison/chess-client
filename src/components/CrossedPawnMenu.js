import React, { Component } from 'react'
import '../styles/CrossedPawnMenu.css'
import MoveLogic from '../helpers/MoveLogic'
import { connect } from 'react-redux'
import {
  getChessBoard,
  getCrossedPawn,
  getSelected,
  getTurn,
  getMoves
} from '../actions/index'

class CrossedPawnMenu extends Component {
  constructor() {
    super()
    this.moveLogic         = new MoveLogic()
    this.handleCrossedPawn = this.handleCrossedPawn.bind(this)
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

    let piece = JSON.parse(JSON.stringify(this.props.moves.slice(-3)[0]))
    let coordinates = JSON.parse(JSON.stringify(this.props.moves.slice(-1)[0])).currentPosition
    let board = JSON.parse(JSON.stringify(this.props.chessBoard))
    let gameMoves = JSON.parse(JSON.stringify(this.props.moves))

    piece.notation = this.moveLogic.createNotation(piece, coordinates, board, gameMoves, pieceType)
    piece.currentPosition = coordinates
    piece.type = pieceType

    gameMoves[gameMoves.length - 1] = piece
    board[coordinates].piece.type = pieceType
    board[coordinates].piece.currentPosition = coordinates
    this.props.dispatch(getMoves(gameMoves))
    this.props.dispatch(getChessBoard(board))
    this.props.sendMove(piece)
    this.props.dispatch(getCrossedPawn(false))
    this.props.dispatch(getSelected(null))
    this.props.dispatch(getTurn(this.props.turn === 'white' ? 'black' : 'white'))
  }

  get background() {
    return this.props.color === 'white' ? 'blackBackground' : 'whiteBackground'
  }

  render() {
    return(
      <div className={`crossedPawnMenu col-xs-3 col-xs-offset-3 ${this.background}`}>
        <i className={`glyphicon glyphicon-knight piece-${this.props.color} piece selectPiece-${this.props.color}`}
          onClick={this.handleCrossedPawn}>
        </i>
        <i className={`glyphicon glyphicon-bishop piece-${this.props.color} piece selectPiece-${this.props.color}`}
          onClick={this.handleCrossedPawn}>
        </i>
        <i className={`glyphicon glyphicon-tower piece-${this.props.color} piece selectPiece-${this.props.color}`}
          onClick={this.handleCrossedPawn}>
        </i>
        <i className={`glyphicon glyphicon-queen piece-${this.props.color} piece selectPiece-${this.props.color}`}
          onClick={this.handleCrossedPawn}>
        </i>
      </div>
    )
  }
}

const mapStateToProps = ({
  moves, chessBoard, crossedPawn, turn, selected
}) => {
  return {
    moves, chessBoard, crossedPawn, turn, selected
  }
}

export default connect(mapStateToProps)(CrossedPawnMenu)
