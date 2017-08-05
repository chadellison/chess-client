import React, { Component } from 'react'
import '../styles/Piece.css'

class Piece extends Component {
  render() {
    return(
      <i className={this.props.styles}></i>
    )
  }
}

export default Piece
