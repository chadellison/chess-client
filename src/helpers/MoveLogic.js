const LETTER_KEY = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8}

class MoveLogic {
    constructor(piece, board, destination, gameMoves) {
        this.piece = piece
        this.board = board
        this.position = piece.currentPosition
        this.destination = destination
        this.gameMoves = gameMoves
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

        return knightMoves.filter((move) => this.validCoordinates(move))
    }

    movesForKing(position = this.position) {
        let columns = [LETTER_KEY[position[0]], LETTER_KEY[position[0]] - 1, LETTER_KEY[position[0]] + 1]
        let rows = [parseInt(position[1], 10), parseInt(position[1], 10) - 1, parseInt(position[1], 10) + 1]

        return this.movesForQueen(position).filter((move) => {
            return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1]))
        })
    }

    movesForPawn(position = this.position) {
        let moves = []
        let nextSquare = this.oneForward(position)
        if(this.isOpen(nextSquare)) {
            moves.push(nextSquare)
            if(this.isOpen(this.oneForward(nextSquare)) && ['2', '7'].includes(position[1])) {
                moves.push(this.oneForward(nextSquare))
            }
        }

        return moves.concat(this.canCapturePiece()).concat(this.canEnPassant())
    }

    oneForward(position) {
      if(this.piece.color === 'white') {
          return position[0] + (parseInt(position[1], 10) + 1)
      } else {
          return position[0] + (parseInt(position[1], 10) - 1)
      }
    }

    oneLeft(position) {
        return String.fromCharCode(position[0].charCodeAt(0) - 1) + position[1]
    }

    oneRight(position) {
        return String.fromCharCode(position[0].charCodeAt(0) + 1) + position[1]
    }

    isOpen(positionToCheck, board = this.board) {
        if (this.validCoordinates(positionToCheck)) {
          return !board[positionToCheck].piece
        }
        return false
    }

    validCoordinates(coordinates) {
        return Object.keys(LETTER_KEY).includes(coordinates[0]) &&
            Object.values(LETTER_KEY).includes(parseInt(coordinates[1], 10))
    }

    canEnPassant(position = this.position) {
        let lastMove = this.gameMoves[this.gameMoves.length - 1]
        let moves = []
        if(lastMove &&
                lastMove.movedTwo &&
                lastMove.type === 'pawn' &&
                [this.oneLeft(position)[0], this.oneRight(position)[0]]
                    .includes(lastMove.currentPosition[0])) {
            moves.push(lastMove.currentPosition[0] + this.oneForward(position)[1])
        }
        return moves
    }

    canCapturePiece(position = this.position) {
        let moves = []
        if(this.checkDiagonal(position, this.oneLeft(position))) {
            moves.push(this.oneLeft(this.oneForward(position)))
        }

        if(this.checkDiagonal(position, this.oneRight(position))) {
            moves.push(this.oneRight(this.oneForward(position)))
        }
        return moves
    }

    checkDiagonal(position, direction) {
      if(this.validCoordinates(direction)) {
          let potentialEnemy = this.board[this.oneForward(direction)].piece
          return potentialEnemy && this.piece.color !== potentialEnemy.color
      }
    }

    validMovePath(position = this.position, destination = this.destination, board = this.board) {
        let result = true
        let moves = []
        let columnMin = position[0] < destination[0] ? position[0] : destination[0]
        let columnMax = position[0] > destination[0] ? position[0] : destination[0]
        let rowMin = position[1] < destination[1] ? position[1] : destination[1]
        let rowMax = position[1] > destination[1] ? position[1] : destination[1]

        if (position[0] === destination[0]) {
            moves = this.movesUp(position).concat(this.movesDown()).filter((move) => {
                return move[1] < rowMax && move[1] > rowMin
            })
        }

        if (position[1] === destination[1]) {
            moves = this.movesLeft(position).concat(this.movesRight()).filter((move) => {
                return move[0] < columnMax && move[0] > columnMin
            })
        }

        if (Math.abs(LETTER_KEY[position[0]] - LETTER_KEY[destination[0]]) === Math.abs(position[1] - destination[1])) {
            moves = this.movesForBishop(position).filter((move) => {
                return move[0] < columnMax &&
                        move[0] > columnMin &&
                        move[1] < rowMax &&
                        move[1] > rowMin
            })
        }
        moves.forEach((move) => {
            if (!this.isOpen(move, board)) {
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

    kingIsSafe(piece, nextMove, chessBoard, gameMoves) {
        let result = true
        let opponentColor = this.opponentColor(piece)
        let updatedBoard = JSON.parse(JSON.stringify(chessBoard))
        let updatedPiece = JSON.parse(JSON.stringify(piece))

        updatedBoard[piece.currentPosition].piece = null
        updatedPiece.currentPosition = nextMove
        updatedBoard[nextMove].piece = updatedPiece

        let opponentPieces = Object.values(updatedBoard)
            .map((square) => square.piece)
            .filter((piece) => piece)
            .filter((piece) => {
                return (piece.color === opponentColor && piece.type !== 'king')
            })
        opponentPieces.forEach((eachPiece) => {
            if(this.inCheck(eachPiece, updatedBoard, gameMoves)) {
              result = false
            }
        })
        return result
    }

    kingLocation(board) {
      return Object.values(board).filter((square) => {
        return(
            square.piece &&
            square.piece.type === 'king' &&
            square.piece.color === this.piece.color
        )
      })[0].piece.currentPosition
    }

    opponentColor(piece) {
        return piece.color === 'white' ? 'black' : 'white'
    }

    inCheck(piece, chessBoard, gameMoves) {
        return(
            this.movesForPiece(piece).includes(this.kingLocation(chessBoard)) &&
            this.validMovePath(piece.currentPosition, this.kingLocation(chessBoard), chessBoard) &&
            this.validateDestination(piece.currentPosition, this.kingLocation(chessBoard), chessBoard)
        )
    }

    movesForPiece(piece) {
        let types = {
            pawn: this.movesForPawn(piece.currentPosition),
            knight: this.movesForKnight(piece.currentPosition),
            bishop: this.movesForBishop(piece.currentPosition),
            rook: this.movesForRook(piece.currentPosition),
            queen: this.movesForQueen(piece.currentPosition),
            king: this.movesForKing(piece.currentPosition)
        }
        return types[piece.type]
    }
}

export default MoveLogic
