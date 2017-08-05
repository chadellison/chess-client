import React, { Component } from 'react'
import '../styles/Piece.css'

const PIECE_KEY = {'pawn': 'pawn',
  'knight': 'knight',
  'bishop': 'bishop',
  'rook': 'tower',
  'queen': 'queen',
  'king': 'king'
}

class Piece extends Component {
  render() {
    return(
      <i className={`glyphicon glyphicon-${PIECE_KEY[this.props.piece.type]} piece-${this.props.piece.color} piece`}
        onClick={() => this.props.handleSelected(this.props.piece.currentPosition)}>
      </i>
    )
  }
}

export default Piece
