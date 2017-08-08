import React, {Component} from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'
import MoveLogic from './helpers/MoveLogic'

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
        if (!this.state.selected) {
            this.setState({
                selected: this.state.chessBoard[id].piece
            })
        } else if (this.state.selected === this.state.chessBoard[id].piece) {
            this.setState({
                selected: null
            })
        }
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
