import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import jsonChessBoard from './jsonChessBoard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      chessBoard: jsonChessBoard
    }
  }

  get currentBoard() {
    let color = false
    return this.boardRows().map((row, rowIndex) => {
      let eachRow = row.map((square, columnIndex) => {
        return(
          <div key={columnIndex}
            className={`col-xs-1${this.setOffset(columnIndex)} square ${this.squareColor(square.id)}`}>
            square
          </div>
        )
      })
      return(<div key={rowIndex} className="row">{eachRow}</div>)
    })
  }

  boardRows() {
    let counter = [0, 8, 16, 24, 32, 40, 48, 56]

    return counter.map((number) => {
      return this.state.chessBoard.slice(number, number + 8)
    })
  }

  setOffset(index) {
    let offset = ''
    if(index === 0) {
        offset = " col-xs-offset-2"
    }
    return offset
  }

  squareColor(id) {
    let letterKey = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8}
    let sum = id.split('').reduce((value, character) => {
      if(letterKey[character]) {
        character = letterKey[character]
      }
      return value + parseInt(character)
    }, 0)

    if(sum % 2 === 0) {
      return 'white'
    } else {
      return 'black'
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <div id="chessBoard">
        {this.currentBoard}
        </div>
      </div>
    )
  }
}

export default App
