const LETTER_KEY = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8}

class MoveLogic {
    constructor(piece, board, destination) {
        this.piece = piece
        this.board = board
        this.position = piece.currentPosition
        this.destination = destination
    }

    movesLeft(position = this.position) {
        let moves = []
        let column = position[0]

        while(column !== 'a') {
            column = String.fromCharCode(column.charCodeAt(0) - 1)
            moves.push(column + position[1])
        }
        return moves
    }

    movesRight(position = this.position) {
        let moves = []
        let column = position[0]

        while(column !== 'h') {
            column = String.fromCharCode(column.charCodeAt(0) + 1)
            moves.push(column + position[1])
        }
        return moves
    }

    movesUp(position = this.position) {
        let moves = []
        let row = parseInt(position[1], 10)

        while(row !== 8) {
            row += 1
            moves.push(position[0] + row)
        }
        return moves
    }

    movesDown(position = this.position) {
        let moves = []
        let row = parseInt(position[1], 10)

        while(row !== 1) {
            row -= 1
            moves.push(position[0] + row)
        }
        return moves
    }

    movesForRook(position = this.position) {
        return this.movesLeft(position)
            .concat(this.movesRight(position))
            .concat(this.movesUp(position))
            .concat(this.movesDown(position))
    }

    movesForBishop(position = this.position) {
        let moves = []
        let count = 0
        let movesRight = this.movesRight(position)
        let movesLeft = this.movesLeft(position)
        let movesUp = this.movesUp(position)
        let movesDown = this.movesDown(position)

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

    movesForQueen(position = this.position) {
        return this.movesForRook(position).concat(this.movesForBishop(position))
    }

    movesForKnight(position = this.position) {
        let knightMoves = []
        let columns = [LETTER_KEY[position[0]], LETTER_KEY[position[0]] + 2, LETTER_KEY[position[0]] - 2]
        let rows = [parseInt(position[1], 10), parseInt(position[1], 10) + 2, parseInt(position[1], 10) - 2]

        this.movesForRook().filter((move) => {
            return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1]))
        }).forEach((move) => {
            if(move[0] === position[0]) {
                knightMoves.push(String.fromCharCode(move[0].charCodeAt(0) + 1) + move[1])
                knightMoves.push(String.fromCharCode(move[0].charCodeAt(0) - 1) + move[1])
            } else {
                knightMoves.push(move[0] + (parseInt(move[1], 10) + 1))
                knightMoves.push(move[0] + (parseInt(move[1], 10) - 1))
            }
        })

        return knightMoves.filter((move) => {
            return (Object.keys(LETTER_KEY).includes(move[0]) &&
                Object.values(LETTER_KEY).includes(parseInt(move[1], 10)))
        })
    }

    movesForKing(position = this.position) {
        let columns = [LETTER_KEY[position[0]], LETTER_KEY[position[0]] - 1, LETTER_KEY[position[0]] + 1]
        let rows = [parseInt(position[1], 10), parseInt(position[1], 10) - 1, parseInt(position[1], 10) + 1]
        
        return this.movesForQueen(position).filter((move) => {
            return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1]))
        })
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

    isOpen(positionToCheck) {
        return !this.board[positionToCheck].piece
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

    convertCoordinates(position) {
        return position.split('').map((coordinate) => {
            if (LETTER_KEY[coordinate]) {
                return LETTER_KEY[coordinate]
            } else {
                return parseInt(coordinate, 10)
            }
        })
    }

    validMovePath(position = this.position, destination = this.destination, board = this.board) {
        let result = true
        let moves = []
        let columnMin = position[0] < destination[0] ? position[0] : destination[0]
        let columnMax = position[0] > destination[0] ? position[0] : destination[0]
        let rowMin = position[1] < destination[1] ? position[1] : destination[1]
        let rowMax = position[1] > destination[1] ? position[1] : destination[1]

        if (position[0] === destination[0]) {
            moves = this.movesUp().concat(this.movesDown()).filter((move) => {
                return move[1] < rowMax && move[1] > rowMin
            })
        }

        if (position[1] === destination[1]) {
            moves = this.movesLeft().concat(this.movesRight()).filter((move) => {
                return move[0] < columnMax && move[0] > columnMin
            })
        }

        if (Math.abs(LETTER_KEY[position[0]] - LETTER_KEY[destination[0]]) === Math.abs(position[1] - destination[1])) {
            moves = this.movesForBishop().filter((move) => {
                return move[0] < columnMax &&
                        move[0] > columnMin &&
                        move[1] < rowMax &&
                        move[1] > rowMin
            })
        }
        moves.forEach((move) => {
            if (!this.isOpen(move)) {
                result = false
            }
        })
        return result
    }

    validateDestination() {
        if (this.board[this.destination].piece) {
            return this.piece.color !== this.board[this.destination].piece.color
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
