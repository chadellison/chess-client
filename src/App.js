import React, { Component } from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      chessBoard: jsonChessBoard
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <Board chessBoard={this.state.chessBoard} />
      </div>
    )
  }
}

export default App
