import React, { Component } from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      chessBoard: jsonChessBoard,
      selected: null
    }
    this.handleSelected = this.handleSelected.bind(this)
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
    this.setState({
      selected: this.state.chessBoard[id].piece
    })
  }

  render() {
    return (
      <div className="App container-fluid">
        <Board chessBoard={this.state.chessBoard}
          handleSelected={this.handleSelected}
        />
      </div>
    )
  }
}

export default App
