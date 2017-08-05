import React, { Component } from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'

const LETTER_KEY = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8}

class App extends Component {
  constructor() {
    super()
    this.state = {
      chessBoard: jsonChessBoard,
      selected: null
    }
    this.handleSelected = this.handleSelected.bind(this)
    this.move = this.move.bind(this)
  }

  move(coordinate) {
    let updatedBoard = this.state.chessBoard
    let piece = this.state.selected

    updatedBoard[piece.currentPosition].piece = null
    piece.currentPosition = coordinate
    updatedBoard[coordinate].piece = piece

    this.setState({
      chessBoard: updatedBoard,
      selected: null
    })
  }

  handleSelected(id) {
    if(!this.state.selected) {
      this.setState({
        selected: this.state.chessBoard[id].piece
      })
    } else if(this.state.selected === this.state.chessBoard[id].piece) {
      this.setState({
        selected: null
      })
    }
  }

  movesForRook(position) {
    let possibleMoves = []
    let coordinates = position.split('').map((coordinate) => {
      if(LETTER_KEY[coordinate]) {
        return LETTER_KEY[coordinate]
      } else {
        return parseInt(coordinate)
      }
    })

    let lettersToRight = 8 - coordinates[0]
    let lettersToLeft = 7 - lettersToRight
    let numbersUp = 8 - coordinates[1]
    let numbersDown = 7 - numbersUp

    return possibleMoves.concat(this.rightAndLeft(lettersToRight, position[0], '+', position[1]))
      .concat(this.rightAndLeft(lettersToLeft, position[0], '-', position[1]))
      .concat(this.upAndDown(numbersUp, position[0], '+', coordinates[1]))
      .concat(this.upAndDown(numbersDown, position[0], '-', coordinates[1]))
  }

  rightAndLeft(count, letter, operator, number) {
    let moves = []
    while(count > 0) {
      if(operator === '+') {
        letter = String.fromCharCode(letter.charCodeAt(0) + 1)
      } else {
        letter = String.fromCharCode(letter.charCodeAt(0) - 1)
      }
      moves.push(letter + number)
      count -= 1
    }
    return moves
  }

  upAndDown(count, letter, operator, number) {
    let moves = []
    while(count > 0) {
      if(operator === '+') {
        number += 1
      } else {
        number -= 1
      }
      moves.push(letter + number)
      count -= 1
    }
    return moves
  }

  render() {
    return (
      <div className='App container-fluid'>
        <Board chessBoard={this.state.chessBoard}
          handleSelected={this.handleSelected}
          isSelected={this.state.selected}
          move={this.move}
        />
      </div>
    )
  }
}

export default App
