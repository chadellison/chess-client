import React, { Component } from 'react'
import '../styles/Square.css'
import Piece from './Piece'

export default class Square extends Component {
  constructor() {
    super()
    this.handleMove = this.handleMove.bind(this)
  }

  get piece() {
    if(this.props.piece) {
      return(
        <Piece
          isValid={this.props.isValid}
          piece={this.props.piece}
        />
      )
    } else {
      return null
    }
  }

  handleMove() {
    if(this.props.isSelected) {
      return this.props.move(this.props.id)
    } else {
      return null
    }
  }

  get availableMove() {
      if(this.props.isSelected && this.props.isSelected.availableMoves.includes(this.props.id)) {
        return ' available'
      } else {
        return ''
      }
  }

  render() {
    return(
      <div id={this.props.id} className={`${this.props.styles}${this.availableMove}`} onClick={this.handleMove}>
        {this.piece}
      </div>
    )
  }
}
