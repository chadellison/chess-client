import React, {Component} from 'react'
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

    nthMovesUpAndDown(position) {
        let possibleMoves = []

        let coordinates = this.convertCoordinates(position)
        let lettersToRight = 8 - coordinates[0]
        let lettersToLeft = 7 - lettersToRight
        let numbersUp = 8 - coordinates[1]
        let numbersDown = 7 - numbersUp

        return possibleMoves.concat(this.rightAndLeft(lettersToRight, position[0], '+', position[1]))
            .concat(this.rightAndLeft(lettersToLeft, position[0], '-', position[1]))
            .concat(this.upAndDown(numbersUp, position[0], '+', coordinates[1]))
            .concat(this.upAndDown(numbersDown, position[0], '-', coordinates[1]))
    }

    rightAndLeft(movementCount, column, direction, row) {
        let moves = []
        while (movementCount > 0) {
            if (direction === '+') {
                column = String.fromCharCode(column.charCodeAt(0) + 1)
            } else {
                column = String.fromCharCode(column.charCodeAt(0) - 1)
            }
            moves.push(column + row)
            movementCount -= 1
        }
        return moves
    }

    upAndDown(movementCount, column, direction, row) {
        let moves = []
        while (movementCount > 0) {
            if (direction === '+') {
                row += 1
            } else {
                row -= 1
            }
            moves.push(column + row)
            movementCount -= 1
        }
        return moves
    }

    nthMovesDiagonal(position) {
        let possibleMoves = []

        let coordinates = this.convertCoordinates(position)

        let lettersToRight = 8 - coordinates[0]
        let lettersToLeft = 7 - lettersToRight
        let numbersUp = 8 - coordinates[1]
        let numbersDown = 7 - numbersUp

        return possibleMoves.concat(this.diagonal(this.lesserPosition(lettersToRight, numbersUp), '+', '+', position[0], coordinates[1]))
            .concat(this.diagonal(this.lesserPosition(lettersToLeft, numbersUp), '+', '-', position[0], coordinates[1]))
            .concat(this.diagonal(this.lesserPosition(lettersToRight, numbersDown), '-', '+', position[0], coordinates[1]))
            .concat(this.diagonal(this.lesserPosition(lettersToLeft, numbersDown), '-', '-', position[0], coordinates[1]))
    }

    lesserPosition(horizontal, vertical) {
        return horizontal > vertical ? vertical : horizontal
    }

    diagonal(movementCount, verticalDirection, horizontalDirection, column, row) {
        let moves = []
        while (movementCount > 0) {
            if(verticalDirection === '+') {
                row += 1
            } else {
                row -= 1
            }

            if(horizontalDirection === '-') {
                column = String.fromCharCode(column.charCodeAt(0) - 1)
            } else {
                column = String.fromCharCode(column.charCodeAt(0) + 1)
            }

            moves.push(column + row)
            movementCount -= 1
        }
        return moves
    }

    convertCoordinates(position) {
        return position.split('').map((coordinate) => {
            if (LETTER_KEY[coordinate]) {
                return LETTER_KEY[coordinate]
            } else {
                return parseInt(coordinate)
            }
        })
    }

    validMovePath(coordinates) {
        let valid = true

        let moves = []
        let startPosition = this.state.selected.currentPosition

        if (startPosition[0] === coordinates[0]) {
            let count = parseInt(startPosition[1]) - parseInt(coordinates[1])
            let direction = count > 0 ? '-' : '+'

            moves = this.upAndDown(Math.abs(count) - 1, coordinates[0], direction, parseInt(startPosition[1]))
        }

        if (startPosition[1] === coordinates[1]) {
            let count = LETTER_KEY[startPosition[0]] - LETTER_KEY[coordinates[0]]
            let direction = count > 0 ? '-' : '+'

            moves = this.rightAndLeft(Math.abs(count) - 1, startPosition[0], direction, startPosition[1])
        }

        let startingNumericCoordinates = this.convertCoordinates(startPosition)
        let destinationNumericCoordinates = this.convertCoordinates(coordinates)

        if(Math.abs(startingNumericCoordinates[0] - destinationNumericCoordinates[0]) === Math.abs(startingNumericCoordinates[1] - destinationNumericCoordinates[1])) {
            let movementCount = Math.abs(startingNumericCoordinates[1] - destinationNumericCoordinates[1]) - 1

            let verticalDirection
            let horizontalDirection

            if(destinationNumericCoordinates[1] > startingNumericCoordinates[1]) {
                verticalDirection = '+'
            } else {
                verticalDirection = '-'
            }

            if(destinationNumericCoordinates[0] > startingNumericCoordinates[0]) {
                horizontalDirection = '+'
            } else {
                horizontalDirection = '-'
            }

            moves = this.diagonal(movementCount, verticalDirection, horizontalDirection, startPosition[0], parseInt(startPosition[1]))
        }

        moves.forEach((move) => {
            if (this.state.chessBoard[move].piece) {
                valid = false
            }
        })

        return valid
    }

    validateDestination(destination) {
        if(this.state.chessBoard[destination].piece) {
            return !(this.state.selected.color === this.state.chessBoard[destination].piece.color)
        } else {
            return true
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
