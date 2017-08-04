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

  render() {
    return (
      <div className="App">
        <div id="chessBoard">
        </div>
      </div>
    )
  }
}

export default App
