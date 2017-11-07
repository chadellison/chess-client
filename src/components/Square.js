import React, { Component } from 'react'
import '../styles/Square.css'
import Piece from './Piece'
import { connect } from 'react-redux'

class Square extends Component {
  constructor() {
    super()
    this.handleMove = this.handleMove.bind(this)
  }

  get piece() {
    if(this.props.piece) {
      return (
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
    if(this.props.selected) {
      return this.props.move(this.props.id)
    } else {
      return null
    }
  }

  get availableMove() {
      if(this.props.selected && this.props.selected.availableMoves.includes(this.props.id)) {
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

const mapStateToProps = ({ selected }) => { return { selected } }

export default connect(mapStateToProps)(Square)
