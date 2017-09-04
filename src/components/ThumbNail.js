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

  get status() {
    if(this.props.game.attributes.pending) {
      return 'Pending'
    } else {
      return 'Active'
    }
  }

  render() {
    return(
      <div className='thumbNail'>
        <p className='gameData'>
          Opponent: {this.props.game.attributes.opponentName}
          <br></br>
          <img className='opponentGravatar' src={`https://www.gravatar.com/avatar/${this.props.game.attributes.opponentGravatar}`} alt="gravatar"/>
          <br></br>
          Status: {this.status}
          <br></br>
          Color: {this.props.game.attributes.playerColor}
        </p>
        <div id={this.props.game.id} className='thumbNailBoard'>{this.currentSetup}</div>
      </div>
    )
  }
}
