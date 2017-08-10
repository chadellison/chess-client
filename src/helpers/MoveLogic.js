const LETTER_KEY = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8}

class MoveLogic {
    static moveCount(position) {
        let coordinates = this.convertCoordinates(position)
        let lettersToRight = 8 - coordinates[0]
        let lettersToLeft = 7 - lettersToRight
        let numbersUp = 8 - coordinates[1]
        let numbersDown = 7 - numbersUp

        return {
            right: lettersToRight,
            left: lettersToLeft,
            up: numbersUp,
            down: numbersDown
        }
    }

    static movesForRook(position) {
        let possibleMoves = []

        let right = this.moveCount(position).right
        let left = this.moveCount(position).left
        let up = this.moveCount(position).up
        let down = this.moveCount(position).down

        return possibleMoves.concat(this.rightAndLeft(right, position[0], '+', position[1]))
            .concat(this.rightAndLeft(left, position[0], '-', position[1]))
            .concat(this.upAndDown(up, position[0], '+', this.convertCoordinates(position)[1]))
            .concat(this.upAndDown(down, position[0], '-', this.convertCoordinates(position)[1]))
    }

    static movesForBishop(position) {
        let possibleMoves = []

        let coordinates = this.convertCoordinates(position)

        let right = this.moveCount(position).right
        let left = this.moveCount(position).left
        let up = this.moveCount(position).up
        let down = this.moveCount(position).down

        this.convertCoordinates(position)

        return possibleMoves.concat(this.diagonal(this.lesserPosition(right, up), '+', '+', position[0], coordinates[1]))
            .concat(this.diagonal(this.lesserPosition(left, up), '+', '-', position[0], coordinates[1]))
            .concat(this.diagonal(this.lesserPosition(right, down), '-', '+', position[0], coordinates[1]))
            .concat(this.diagonal(this.lesserPosition(left, down), '-', '-', position[0], coordinates[1]))
    }

    static movesForQueen(position) {
        return this.movesForRook(position)
            .concat(this.movesForBishop(position))
    }

    static movesForKnight(position) {
        let coordinates = this.convertCoordinates(position)

        return [
            (coordinates[0] + 2).toString() + (coordinates[1] + 1),
            (coordinates[0] + 2).toString() + (coordinates[1] - 1),
            (coordinates[0] - 2).toString() + (coordinates[1] + 1),
            (coordinates[0] - 2).toString() + (coordinates[1] - 1),
            (coordinates[0] + 1).toString() + (coordinates[1] + 2),
            (coordinates[0] - 1).toString() + (coordinates[1] + 2),
            (coordinates[0] + 1).toString() + (coordinates[1] - 2),
            (coordinates[0] - 1).toString() + (coordinates[1] - 2)
        ].filter((numericPosition) => {
            return (numericPosition[0] > 0 && numericPosition[0] < 9 &&
            numericPosition[1] > 0 && numericPosition[1] < 9)
        }).map((coordinateSet) => {
            return Object.keys(LETTER_KEY)[coordinateSet[0] - 1] + coordinateSet[1]
        })

    }

    static movesForKing(position) {
        let moves = [
            position[0] + (parseInt(position[1]) - 1),
            position[0] + (parseInt(position[1]) + 1),
            String.fromCharCode(position[0].charCodeAt(0) + 1) + position[1],
            String.fromCharCode(position[0].charCodeAt(0) - 1) + position[1],
            String.fromCharCode(position[0].charCodeAt(0) + 1) + (parseInt(position[1]) + 1),
            String.fromCharCode(position[0].charCodeAt(0) + 1) + (parseInt(position[1]) - 1),
            String.fromCharCode(position[0].charCodeAt(0) - 1) + (parseInt(position[1]) + 1),
            String.fromCharCode(position[0].charCodeAt(0) - 1) + (parseInt(position[1]) - 1)

        ].filter((coordinates) => {
            return Object.keys(LETTER_KEY).includes(coordinates[0]) && Object.values(LETTER_KEY).includes(parseInt(coordinates[1]))
        })

        if (position === 'e1' || position === 'e8') {
            moves.push('c' + position[1])
            moves.push('g' + position[1])
        }

        return moves
    }

    static movesForPawn(position, color, board) {
        let moves = []
        let nextSquare = this.oneForward(position, color)

        if(this.isOpen(nextSquare, board)) {
            moves.push(nextSquare)
        }

        if(moves.length > 0 && this.isOpen(this.oneForward(nextSquare, color), board) && (position[1] === '2' || position[1] === '7')) {
          moves.push(this.oneForward(nextSquare, color))
        }

        return moves.concat(this.checkProximity(position, board, color))
    }

    static oneForward(position, color) {
      if(color === 'white') {
        return position[0] + (parseInt(position[1]) + 1)
      } else {
        return position[0] + (parseInt(position[1]) - 1)
      }
    }

    static isOpen(positionToCheck, board) {
        return !board[positionToCheck].piece
    }

    static checkProximity(position, board, color) {
        let toLeft = String.fromCharCode(position[0].charCodeAt(0) - 1)
        let toRight = String.fromCharCode(position[0].charCodeAt(0) + 1)

        if (color === 'white') {
            toLeft += (parseInt(position[1]) + 1)
            toRight += (parseInt(position[1]) + 1)
        } else {
            toLeft += (parseInt(position[1]) - 1)
            toRight += (parseInt(position[1]) - 1)
        }

        return [toLeft, toRight].filter((coordinate) => {
            return (board[coordinate].piece && board[coordinate].piece.color !== color)
        })
    }

    static lesserPosition(horizontal, vertical) {
        return horizontal > vertical ? vertical : horizontal
    }

    static upAndDown(movementCount, column, direction, row) {
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

    static rightAndLeft(movementCount, column, direction, row) {
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

    static diagonal(movementCount, verticalDirection, horizontalDirection, column, row) {
        let moves = []
        while (movementCount > 0) {
            if (verticalDirection === '+') {
                row += 1
            } else {
                row -= 1
            }

            if (horizontalDirection === '-') {
                column = String.fromCharCode(column.charCodeAt(0) - 1)
            } else {
                column = String.fromCharCode(column.charCodeAt(0) + 1)
            }

            moves.push(column + row)
            movementCount -= 1
        }
        return moves
    }

    static convertCoordinates(position) {
        return position.split('').map((coordinate) => {
            if (LETTER_KEY[coordinate]) {
                return LETTER_KEY[coordinate]
            } else {
                return parseInt(coordinate)
            }
        })
    }

    static fetchVerticalMoves(startPosition, coordinates) {
        let count = parseInt(startPosition[1]) - parseInt(coordinates[1])
        let direction = count > 0 ? '-' : '+'

        return this.upAndDown(Math.abs(count) - 1, coordinates[0], direction, parseInt(startPosition[1]))
    }

    static fetchHorizontalMoves(startPosition, coordinates) {
        let count = LETTER_KEY[startPosition[0]] - LETTER_KEY[coordinates[0]]
        let direction = count > 0 ? '-' : '+'

        return this.rightAndLeft(Math.abs(count) - 1, startPosition[0], direction, startPosition[1])
    }

    static fetchDiagonalMoves(startCoordinates, endCoordinates, startPosition) {
        let movementCount = Math.abs(startCoordinates[1] - endCoordinates[1]) - 1
        let verticalDirection = endCoordinates[1] > startCoordinates[1] ? '+' : '-'
        let horizontalDirection = endCoordinates[0] > startCoordinates[0] ? '+' : '-'

        return this.diagonal(movementCount, verticalDirection, horizontalDirection, startPosition[0], parseInt(startPosition[1]))
    }

    static validMovePath(startPosition, coordinates, currentBoard) {
        let valid = true
        let moves = []

        if (startPosition[0] === coordinates[0]) {
            moves = this.fetchVerticalMoves(startPosition, coordinates)
        }

        if (startPosition[1] === coordinates[1]) {
            moves = this.fetchHorizontalMoves(startPosition, coordinates)
        }

        let startCoordinates = this.convertCoordinates(startPosition)
        let endCoordinates = this.convertCoordinates(coordinates)

        if (Math.abs(startCoordinates[0] - endCoordinates[0]) === Math.abs(startCoordinates[1] - endCoordinates[1])) {
            moves = this.fetchDiagonalMoves(startCoordinates, endCoordinates, startPosition)
        }

        moves.forEach((move) => {
            if (currentBoard[move].piece) {
                valid = false
            }
        })

        return valid
    }

    static validateDestination(selected, destination, chessBoard) {
        if (chessBoard[destination].piece) {
            return !(selected.color === chessBoard[destination].piece.color)
        } else {
            return true
        }
    }
}

module.exports = MoveLogic
