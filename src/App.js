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
    return this.boardRows().map((row, rowIndex) => {
      let eachRow = row.map((square, columnIndex) => {
        return <div key={columnIndex} className={`col-xs-1${this.setOffset(columnIndex)} square`}>square</div>
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
