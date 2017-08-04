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
    return(
      this.state.chessBoard.map((row, rowIndex) => {
        let eachRow = row.map((square, columnIndex) => {
          let offset = ""
          if (columnIndex === 0) {
            offset = " col-xs-offset-2"
          }
          return(<div key={columnIndex} className={`col-xs-1${offset}`}>square</div>)
        })
        return(<div key={rowIndex} className="row">{eachRow}</div>)
      })
    )
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
