const LETTER_KEY = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8}

class MoveLogic {
    constructor(piece, board, destination) {
        this.piece = piece
        this.board = board
        this.position = piece.currentPosition
        this.destination = destination
    }

    movesLeft() {
        let moves = []
        let column = this.position[0]

        while(column !== 'a') {
            column = String.fromCharCode(column.charCodeAt(0) - 1)
            moves.push(column + this.position[1])
        }
        return moves
    }

    movesRight() {
        let moves = []
        let column = this.position[0]

        while(column !== 'h') {
            column = String.fromCharCode(column.charCodeAt(0) + 1)
            moves.push(column + this.position[1])
        }
        return moves
    }

    movesUp() {
        let moves = []
        let row = parseInt(this.position[1], 10)

        while(row !== 8) {
            row += 1
            moves.push(this.position[0] + row)
        }
        return moves
    }

    movesDown() {
        let moves = []
        let row = parseInt(this.position[1], 10)

        while(row !== 1) {
            row -= 1
            moves.push(this.position[0] + row)
        }
        return moves
    }

    movesForRook() {
        return this.movesLeft()
            .concat(this.movesRight())
            .concat(this.movesUp())
            .concat(this.movesDown())
    }

    movesForBishop() {
        let moves = []
        let count = 0
        let movesRight = this.movesRight()
        let movesLeft = this.movesLeft()
        let movesUp = this.movesUp()
        let movesDown = this.movesDown()

        while (count < 7) {
            moves.push(movesRight[count] + movesUp[count])
            moves.push(movesLeft[count] + movesUp[count])
            moves.push(movesLeft[count] + movesDown[count])
            moves.push(movesRight[count] + movesDown[count])
            count += 1
        }
        return moves.filter((move) => move && move.length === 4)
            .map((coordinates) => coordinates[0] + coordinates[3])
    }

    movesForQueen() {
        return this.movesForRook().concat(this.movesForBishop())
    }

    movesForKnight(position) {
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

    movesForKing(position) {
        let moves = [
            position[0] + (parseInt(position[1], 10) - 1),
            position[0] + (parseInt(position[1], 10) + 1),
            String.fromCharCode(position[0].charCodeAt(0) + 1) + position[1],
            String.fromCharCode(position[0].charCodeAt(0) - 1) + position[1],
            String.fromCharCode(position[0].charCodeAt(0) + 1) + (parseInt(position[1], 10) + 1),
            String.fromCharCode(position[0].charCodeAt(0) + 1) + (parseInt(position[1], 10) - 1),
            String.fromCharCode(position[0].charCodeAt(0) - 1) + (parseInt(position[1], 10) + 1),
            String.fromCharCode(position[0].charCodeAt(0) - 1) + (parseInt(position[1], 10) - 1)

        ].filter((coordinates) => {
            return Object.keys(LETTER_KEY).includes(coordinates[0]) && Object.values(LETTER_KEY).includes(parseInt(coordinates[1], 10))
        })

        if (position === 'e1' || position === 'e8') {
            moves.push('c' + position[1])
            moves.push('g' + position[1])
        }

        return moves
    }

    movesForPawn(position, color, board, gameMoves) {
        let moves = []
        let nextSquare = this.oneForward(position, color)
        if(this.isOpen(nextSquare, board)) {
            moves.push(nextSquare)
        }

        if(moves.length > 0 && this.isOpen(this.oneForward(nextSquare, color), board) && (position[1] === '2' || position[1] === '7')) {
          moves.push(this.oneForward(nextSquare, color))
        }
        return moves.concat(this.checkProximity(position, board, color, gameMoves))
    }

    oneForward(position, color) {
      if(color === 'white') {
        return position[0] + (parseInt(position[1], 10) + 1)
      } else {
        return position[0] + (parseInt(position[1], 10) - 1)
      }
    }

    isOpen(positionToCheck, board) {
        return !board[positionToCheck].piece
    }

    checkProximity(position, board, color, gameMoves) {
        let toLeft = String.fromCharCode(position[0].charCodeAt(0) - 1)
        let toRight = String.fromCharCode(position[0].charCodeAt(0) + 1)

        if (color === 'white') {
            toLeft += (parseInt(position[1], 10) + 1)
            toRight += (parseInt(position[1], 10) + 1)
        } else {
            toLeft += (parseInt(position[1], 10) - 1)
            toRight += (parseInt(position[1], 10) - 1)
        }

        return [toLeft, toRight].filter((coordinates) => {
            return(
                Object.keys(LETTER_KEY).includes(coordinates[0]) &&
                Object.values(LETTER_KEY).includes(parseInt(coordinates[1], 10))
            )
        }).filter((coordinates) => {
          if(coordinates[1] === '6' && color === 'white') {
              let enPassant = board[coordinates[0] + (parseInt(coordinates[1], 10) - 1)].piece
              if(enPassant === gameMoves[gameMoves.length - 1] && !board[coordinates].piece) {
                  return true
              }
          }

          if(coordinates[1] === '3' && color === 'black') {
              let enPassant = board[coordinates[0] + (parseInt(coordinates[1], 10) + 1)].piece
              if(enPassant === gameMoves[gameMoves.length - 1] && !board[coordinates].piece) {
                  return true
              }
          }

          if(board[coordinates].piece) {
              return board[coordinates].piece.color !== color
          }
          return false
        })
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

    diagonal(movementCount, verticalDirection, horizontalDirection, column, row) {
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

    convertCoordinates(position) {
        return position.split('').map((coordinate) => {
            if (LETTER_KEY[coordinate]) {
                return LETTER_KEY[coordinate]
            } else {
                return parseInt(coordinate, 10)
            }
        })
    }

    fetchVerticalMoves(startPosition, coordinates) {
        let count = parseInt(startPosition[1], 10) - parseInt(coordinates[1], 10)
        let direction = count > 0 ? '-' : '+'

        return this.upAndDown(Math.abs(count) - 1, coordinates[0], direction, parseInt(startPosition[1], 10))
    }

    fetchHorizontalMoves(startPosition, coordinates) {
        let count = LETTER_KEY[startPosition[0]] - LETTER_KEY[coordinates[0]]
        let direction = count > 0 ? '-' : '+'

        return this.rightAndLeft(Math.abs(count) - 1, startPosition[0], direction, startPosition[1])
    }

    fetchDiagonalMoves(startCoordinates, endCoordinates, startPosition) {
        let movementCount = Math.abs(startCoordinates[1] - endCoordinates[1]) - 1
        let verticalDirection = endCoordinates[1] > startCoordinates[1] ? '+' : '-'
        let horizontalDirection = endCoordinates[0] > startCoordinates[0] ? '+' : '-'

        return this.diagonal(movementCount, verticalDirection, horizontalDirection, startPosition[0], parseInt(startPosition[1], 10))
    }

    validMovePath(startPosition, coordinates, currentBoard) {
      // use is open
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

    // validMovePath() {
    //     let result = true
    //     let moves = []
    //     if(this.position[0] === this.destination[0]) {
    //         // vert move
    //         let lesserValue = position[1] < destination[1] ? position[1] : destination[1]
    //         let greaterValue = position[1] > destination[1] ? position[1] : destination[1]
    //
    //         moves = this.movesUp.concat(this.movesDown).filter((move) => {
    //             let moveValue = move[1]
    //             return moveValue < greaterValue && moveValue > lesserValue
    //         })
    //     }
    //
    //     if(this.position[1] === this.destination[1]) {
    //         let lesserValue = position[0] < destination[0] ? position[0] : destination[0]
    //         let greaterValue = position[0] > destination[0] ? position[0] : destination[0]
    //
    //         moves = this.movesUp.concat(this.movesDown).filter((move) => {
    //             let moveValue = move[1]
    //             return moveValue < greaterValue && moveValue > lesserValue
    //     }
    //
    //     moves.forEach((move) => {
    //         if (!this.isOpen(move)) {
    //             result = false
    //         }
    //     })
    //     return result
    // }

    validateDestination(selected, destination, chessBoard) {
        if (chessBoard[destination].piece) {
            return !(selected.color === chessBoard[destination].piece.color)
        } else {
            return true
        }
    }

    kingIsSafe(piece, nextMove, chessBoard, kingLocation, gameMoves) {
        let result = true
        let opponentColor = this.opponentColor(piece)
        let updatedBoard = JSON.parse(JSON.stringify(chessBoard))
        updatedBoard[piece.currentPosition].piece = null
        updatedBoard[nextMove].piece = piece


        let opponentPieces = Object.values(updatedBoard)
            .map((square) => square.piece)
            .filter((piece) => piece)
            .filter((piece) => {
                return (piece.color === opponentColor && piece.type !== 'king')
            })
        opponentPieces.forEach((eachPiece) => {
            if(this.inCheck(eachPiece, kingLocation, updatedBoard, gameMoves)) {
              result = false
            }
        })
        return result
    }

    opponentColor(piece) {
        return piece.color === 'white' ? 'black' : 'white'
    }

    inCheck(piece, kingLocation, chessBoard, gameMoves) {
      return(
          this.movesForPiece(piece, chessBoard, gameMoves)[piece.type].includes(kingLocation) &&
          this.validMovePath(piece.currentPosition, kingLocation, chessBoard) &&
          this.validateDestination(piece.currentPosition, kingLocation, chessBoard)
      )
    }

    movesForPiece(piece, chessBoard, gameMoves) {
      return {
        pawn: this.movesForPawn(piece.currentPosition, piece.color, chessBoard, gameMoves),
        knight: this.movesForKnight(piece.currentPosition),
        bishop: this.movesForBishop(piece.currentPosition),
        rook: this.movesForRook(piece.currentPosition),
        queen: this.movesForQueen(piece.currentPosition),
        king: this.movesForKing(piece.currentPosition)
      }
    }
}

export default MoveLogic
