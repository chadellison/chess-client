import React, { Component } from 'react'
import '../styles/MiniSquare.css'

export default class MiniSquare extends Component {
  render() {
    return(
      <div className={`col-xs-1 miniSquare ${this.props.color}`}>
        s
      </div>
    )
  }
}
