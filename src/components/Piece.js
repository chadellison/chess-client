import React, { Component } from 'react'
import '../styles/Piece.css'

const PIECE_KEY = {
  'pawn': 'pawn',
  'knight': 'knight',
  'bishop': 'bishop',
  'rook': 'tower',
  'queen': 'queen',
  'king': 'king'
}

export default class Piece extends Component {
  get selected() {
    if(this.props.isSelected === this.props.piece) {
      return 'selected'
    } else {
      return ''
    }
  }

  render() {
    return(
      <i
        id={this.props.piece.startIndex}
        className={
          `glyphicon glyphicon-${PIECE_KEY[this.props.piece.type]}
           piece-${this.props.piece.color} piece ${this.selected}
           ${this.props.playerColor}`
         }
        onClick={() => this.props.handleSelected(this.props.piece)}
      />
    )
  }
}
