import React, { Component } from 'react'
import '../styles/Square.css'
import Piece from './Piece'

class Square extends Component {
  constructor() {
    super()
  }

  get piece() {
    if(this.props.piece) {
      return(
        <Piece
          handleSelected={this.props.handleSelected}
          piece={this.props.piece}
        />
      )
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
