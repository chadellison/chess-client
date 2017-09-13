import React, { Component } from 'react'
import MiniSquare from './MiniSquare'
import jsonChessBoard from '../jsonChessBoard'
import '../styles/ThumbNail.css'
import LETTER_KEY from '../helpers/BoardHelper'

export default class ThumbNail extends Component {
  thumbNailBoard() {
    let board = JSON.parse(JSON.stringify(jsonChessBoard))
    let gameMoves = this.props.game.included.map((piece) => {
      return {
        color: piece.attributes.color,
        type: piece.attributes.pieceType,
        currentPosition: piece.attributes.currentPosition,
        startIndex: piece.attributes.startIndex,
        hasMoved: piece.attributes.hasMoved,
        movedTwo: piece.attributes.movedTwo
      }
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
            playerColor={this.playerColor}
          />
        )
      })
      return <div key={rowIndex} className="row">{eachRow}</div>
    })
  }

  get status() {
    if(this.props.game.attributes.pending) {
      if (this.props.game.attributes.pending && !this.props.game.attributes.isChallenger) {
        return (
          <a className='acceptChallenge' onClick={() => this.props.handleAcceptChallenge(this.props.game.id)}>
            Accept Challenge
          </a>)
      } else {
        return 'Status: Pending'
      }
    } else {
      return 'Status: Active'
    }
  }

  get playerColor() {
    return this.props.game.attributes.playerColor === 'black' ? 'blackPlayer' : ''
  }

  render() {
    return(
      <div className='thumbNail'>
        <p className='gameData'>
          Opponent: {this.props.game.attributes.opponentName}
          <br></br>
          <img className='opponentGravatar' src={`https://www.gravatar.com/avatar/${this.props.game.attributes.opponentGravatar}`} alt="gravatar"/>
          <br></br>
          {this.status}
          <br></br>
          Color: {this.props.game.attributes.playerColor}
        </p>
        <div id={this.props.game.id}
          className={`thumbNailBoard ${this.playerColor}`}
          onClick={() => this.props.handleCurrentGame(this.props.game)}>
            {this.currentSetup}
        </div>
      </div>
    )
  }
}
