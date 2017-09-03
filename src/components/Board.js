import React, { Component } from 'react'
import '../styles/Board.css'
import Square from './Square'

const LETTER_KEY = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 }

export default class Board extends Component {
    get currentSetup() {
        return this.boardRows().map((row, rowIndex) => {
          let eachRow = row.map((square, columnIndex) => {
            return(
              <Square key={columnIndex}
                styles={`col-xs-1 square${this.setOffset(columnIndex)} ${this.squareColor(square)}`}
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

  setOffset(index) {
      if(index % 8 === 0) {
          return ' col-xs-offset-2'
      } else {
          return ''
      }
  }

  boardRows() {
    let index = 0
    let boardToArray = Object.keys(this.props.chessBoard)

    return Array.apply(null, {length: 8}).map(() => {
      return boardToArray.slice(index, index += 8)
    })
  }

  squareColor(id) {
    let sum = id.split('').reduce((value, character) => {
      if(LETTER_KEY[character]) {
        character = LETTER_KEY[character]
      }
      return value + parseInt(character, 10)
    }, 0)

    return sum % 2 === 0 ? 'white' : 'black'
  }

  render() {
      return <div id='chessBoard' className='col-xs-8'>{this.currentSetup}</div>
  }
}
