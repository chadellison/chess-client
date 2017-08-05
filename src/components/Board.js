import React, { Component } from 'react'
import '../styles/Board.css'
import jsonChessBoard from '../jsonChessBoard'
import Square from './Square'

const LETTER_KEY = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8}

class Board extends Component {
  constructor() {
    super()
  }

  get currentSetup() {
    let color = false
    return this.boardRows().map((row, rowIndex) => {
      let eachRow = row.map((square, columnIndex) => {
        return(
          <Square key={columnIndex}
            styles={`col-xs-1${this.setOffset(columnIndex)} square ${this.squareColor(square)}`}
            piece={this.props.chessBoard[square].piece}
            handleSelected={this.props.handleSelected}
            isSelected={this.props.isSelected}
            id={square}
            move={this.props.move}
          />
        )
      })
      return(<div key={rowIndex} className="row">{eachRow}</div>)
    })
  }

  boardRows() {
    let index = 0
    let boardToArray = Object.keys(this.props.chessBoard)

    return Array.apply(null, {length: 8}).map(() => {
      return boardToArray.slice(index, index += 8)
    })
  }

  setOffset(index) {
    return index === 0 ? ' col-xs-offset-2' : ''
  }

  squareColor(id) {
    let sum = id.split('').reduce((value, character) => {
      if(LETTER_KEY[character]) {
        character = LETTER_KEY[character]
      }
      return value + parseInt(character)
    }, 0)

    return sum % 2 === 0 ? 'white' : 'black'
  }

  render() {
    return(
      <div id="chessBoard">
        {this.currentSetup}
        <i className="glyphicon glyphicon-pawn"></i>
      </div>
    )
  }
}

export default Board
