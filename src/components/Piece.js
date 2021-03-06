import React, { Component } from 'react'
import '../styles/Piece.css'
import MoveLogic from '../helpers/MoveLogic'
import { connect } from 'react-redux'
import { DragDropContainer } from 'react-drag-drop-container'
import {
  getSelected,
  getChessBoard,
  getMessageToUser,
  getPreviousBoard
} from '../actions/index'

const PIECE_KEY = {
  'pawn': 'pawn',
  'knight': 'knight',
  'bishop': 'bishop',
  'rook': 'tower',
  'queen': 'queen',
  'king': 'king'
}

class Piece extends Component {
  constructor() {
    super()
    this.moveLogic = new MoveLogic()

    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSelected(selectedPiece) {
    if (!this.props.crossedPawn) {
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
                return this.props.isValid(piece, move, board, gameMoves)
              })

              piece.availableMoves = availableMoves
              board[piece.currentPosition].piece = piece

              this.props.dispatch(getSelected(piece))
              this.props.dispatch(getChessBoard(board))
            }
          }
        } else {
          if (!this.props.checkmate && !this.props.stalemate) {
            this.props.dispatch(getMessageToUser(`${this.props.turn}'s turn`))
          }
        }
      }
      this.props.dispatch(getPreviousBoard(null))
    }
  }

  get selected() {
    if(this.props.selected === this.props.piece) {
      return 'selected'
    } else {
      return ''
    }
  }

  render() {
    return(
      <DragDropContainer
        targetKey='dropSquare'
        dragData={{piece: this.props.piece}}
        returnToBase={true}
        onDragStart={() => this.handleSelected(this.props.piece)}>
        <i
          id={this.props.piece.startIndex}
          className={
            `glyphicon glyphicon-${PIECE_KEY[this.props.piece.type]}
             piece-${this.props.piece.color} piece ${this.selected}`
           }
        />
      </DragDropContainer>
    )
  }
}

const mapStateToProps = ({
  selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
  moves, previousBoard, checkmate, stalemate, crossedPawn
}) => {
  return {
    selected, chessBoard, currentGameActive, playerColor, turn, messageToUser,
    moves, previousBoard, checkmate, stalemate, crossedPawn
  }
}

export default connect(mapStateToProps)(Piece)
