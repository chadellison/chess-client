import React, { Component } from 'react'
import '../styles/MiniSquare.css'

export default class MiniSquare extends Component {
  findPieceType() {
    if(this.props.piece.type === 'rook') {
      return 'tower'
    } else {
      return this.props.piece.type
    }
  }

  get miniPiece() {
    if(this.props.piece) {
      return(
        <span className={`glyphicon glyphicon-${this.findPieceType()} miniPiece piece-${this.props.piece.color}`}>
        </span>
      )
    } else {
      return null
    }
  }

  render() {
    return(
      <div className={`col-xs-1 miniSquare ${this.props.color}`}>
        {this.miniPiece}
      </div>
    )
  }
}
