import React, { Component } from 'react'
import MiniSquare from './MiniSquare'
import jsonChessBoard from '../jsonChessBoard'
import '../styles/ThumbNail.css'

const LETTER_KEY = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8}

export default class ThumbNail extends Component {

  thumbNailBoard() {
    let board = JSON.parse(JSON.stringify(jsonChessBoard))
    let gameMoves = this.props.game.included.map((piece) => {
      let gameMove = {}
      gameMove[piece.currentPosition] = piece
      return gameMove
    })

    return this.props.moveLogic.setBoard(gameMoves, board)
  }

  boardRows() {
    let index = 0
    let boardToArray = Object.keys(this.thumbNailBoard())

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

  get currentSetup() {
    return this.boardRows().map((row, rowIndex) => {
      let eachRow = row.map((square, columnIndex) => {
        return(
          <MiniSquare key={columnIndex}
            color={this.squareColor(square)}
            piece={this.thumbNailBoard()[square].piece}
          />
        )
      })
      return <div key={rowIndex} className="row">{eachRow}</div>
    })
  }

  render() {
    return(
      <div className="col-md-4 col-sm-6 col-xs-12 thumbNail">
        <h3 className='status'>pending</h3>
        <div id={this.props.game.id} className='thumbNailBoard'>{this.currentSetup}</div>
      </div>
    )
  }
}
