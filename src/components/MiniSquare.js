import React, { Component } from 'react'
import '../styles/MiniSquare.css'

export default class MiniSquare extends Component {
  get miniPiece() {
    let type
    if(this.props.piece) {
      if(this.props.piece.type === 'rook') {
        type = 'tower'
      } else {
        type = this.props.piece.type
      }
      return(
        <span className={`glyphicon glyphicon-${type} miniPiece piece-${this.props.piece.color} ${this.props.playerColor}`}>
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
