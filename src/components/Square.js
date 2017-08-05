import React, { Component } from 'react'
import '../styles/Square.css'
import Piece from './Piece'

const PIECE_KEY = {'pawn': 'pawn',
  'knight': 'knight',
  'bishop': 'bishop',
  'rook': 'tower',
  'queen': 'queen',
  'king': 'king'
}

class Square extends Component {
  constructor() {
    super()
  }

  get piece() {
    let piece = this.props.square.piece
    if(piece) {
      return <Piece styles={`glyphicon glyphicon-${PIECE_KEY[piece.type]} piece-${piece.color} piece`}/>
    } else {
      return null
    }
  }

  render() {
    return(
      <div className={this.props.styles}>
        {this.piece}
      </div>
    )
  }
}

export default Square
