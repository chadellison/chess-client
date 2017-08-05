import React, { Component } from 'react'
import '../styles/Square.css'
import Piece from './Piece'

class Square extends Component {
  constructor() {
    super()
    this.handleMove = this.handleMove.bind(this)
  }

  get piece() {
    if(this.props.piece) {
      return(
        <Piece
          handleSelected={this.props.handleSelected}
          piece={this.props.piece}
          isSelected={this.props.isSelected}
        />
      )
    } else {
      return null
    }
  }

  handleMove() {
    if(this.props.isSelected) {
      return this.props.move(this.props.id)
    }
  }

  render() {
    return(
      <div className={this.props.styles} onClick={this.handleMove}>
        {this.piece}
      </div>
    )
  }
}

export default Square
