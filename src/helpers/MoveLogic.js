const LETTER_KEY = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8}

class MoveLogic {
    movesLeft(position) {
        let moves = []
        let column = position[0]

        while(column !== 'a') {
            column = String.fromCharCode(column.charCodeAt(0) - 1)
            moves.push(column + position[1])
        }
        return moves
    }

    movesRight(position) {
        let moves = []
        let column = position[0]

        while(column !== 'h') {
            column = String.fromCharCode(column.charCodeAt(0) + 1)
            moves.push(column + position[1])
        }
        return moves
    }

    movesUp(position) {
        let moves = []
        let row = parseInt(position[1], 10)

        while(row !== 8) {
            row += 1
            moves.push(position[0] + row)
        }
        return moves
    }

    movesDown(position) {
        let moves = []
        let row = parseInt(position[1], 10)

        while(row !== 1) {
            row -= 1
            moves.push(position[0] + row)
        }
        return moves
    }

    movesForRook(position) {
        return this.movesLeft(position)
            .concat(this.movesRight(position))
            .concat(this.movesUp(position))
            .concat(this.movesDown(position))
    }

    movesForBishop(position) {
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

    movesForQueen(position) {
        return this.movesForRook(position).concat(this.movesForBishop(position))
    }

    movesForKnight(position) {
        let knightMoves = []
        let columns = [LETTER_KEY[position[0]], LETTER_KEY[position[0]] + 2, LETTER_KEY[position[0]] - 2]
        let rows = [parseInt(position[1], 10), parseInt(position[1], 10) + 2, parseInt(position[1], 10) - 2]

        this.movesForRook(position).filter((move) => {
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

    movesForKing(position, board, gameMoves) {
        let columns = [LETTER_KEY[position[0]], LETTER_KEY[position[0]] - 1, LETTER_KEY[position[0]] + 1]
        let rows = [parseInt(position[1], 10), parseInt(position[1], 10) - 1, parseInt(position[1], 10) + 1]

        let moves = this.movesForQueen(position).filter((move) => {
            return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1]))
        })

        if(!gameMoves.includes(board[position].piece)) {
            moves.push(String.fromCharCode(position[0].charCodeAt(0) - 2) + position[1])
            moves.push(String.fromCharCode(position[0].charCodeAt(0) + 2) + position[1])
        }
        return moves
    }

    movesForPawn(position, board, gameMoves) {
        let moves = []
        let nextSquare = this.oneForward(position, this.getColor(position, board))
        if(this.isOpen(nextSquare, board)) {
            moves.push(nextSquare)
            if(this.isOpen(this.oneForward(nextSquare, this.getColor(position, board)), board) && ['2', '7'].includes(position[1])) {
                moves.push(this.oneForward(nextSquare, this.getColor(position, board)))
            }
        }

        return moves.concat(this.canCapturePiece(position, board)).concat(this.canEnPassant(position, board, gameMoves))
    }

    oneForward(position, color) {
      if(color === 'white') {
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

    isOpen(positionToCheck, board) {
        if (this.validCoordinates(positionToCheck)) {
          return !board[positionToCheck].piece
        }
        return false
    }

    validCoordinates(coordinates) {
        return Object.keys(LETTER_KEY).includes(coordinates[0]) &&
            Object.values(LETTER_KEY).includes(parseInt(coordinates[1], 10))
    }

    canEnPassant(position, board, gameMoves) {
        let lastMovedPiece = gameMoves[gameMoves.length - 1]
        let moves = []
        if(lastMovedPiece &&
                lastMovedPiece.movedTwo &&
                lastMovedPiece.type === 'pawn' &&
                lastMovedPiece.currentPosition[1] === position[1] &&
                [this.oneLeft(position)[0], this.oneRight(position)[0]]
                    .includes(lastMovedPiece.currentPosition[0])) {
            moves.push(lastMovedPiece.currentPosition[0] + this.oneForward(position, this.getColor(position, board))[1])
        }
        return moves
    }

    canCapturePiece(position, board) {
        let moves = []
        if(this.checkDiagonal(position, this.oneLeft(position), board)) {
            moves.push(this.oneLeft(this.oneForward(position, this.getColor(position, board))))
        }

        if(this.checkDiagonal(position, this.oneRight(position), board)) {
            moves.push(this.oneRight(this.oneForward(position, this.getColor(position, board))))
        }
        return moves
    }

    checkDiagonal(position, direction, board) {
      if(this.validCoordinates(this.oneForward(direction, this.getColor(position, board)))) {
          let potentialEnemy = board[this.oneForward(direction, this.getColor(position, board))].piece
          return potentialEnemy && this.getColor(position, board) !== potentialEnemy.color
      }
    }

    validMovePath(position, destination, board) {
        let result = true
        let moves = []
        let columnMin = position[0] < destination[0] ? position[0] : destination[0]
        let columnMax = position[0] > destination[0] ? position[0] : destination[0]
        let rowMin = position[1] < destination[1] ? position[1] : destination[1]
        let rowMax = position[1] > destination[1] ? position[1] : destination[1]

        if (position[0] === destination[0]) {
            moves = this.movesUp(position).concat(this.movesDown(position)).filter((move) => {
                return move[1] < rowMax && move[1] > rowMin
            })
        }

        if (position[1] === destination[1]) {
            moves = this.movesLeft(position).concat(this.movesRight(position)).filter((move) => {
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

    validDestination(board, color, destination) {
        if (board[destination].piece) {
            return color !== board[destination].piece.color
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

        this.opponentPieces(updatedBoard, opponentColor).forEach((eachPiece) => {
            if(this.inCheck(eachPiece, updatedBoard, gameMoves)) {
                result = false
            }
        })

        if (this.kingCastle(piece, nextMove)) {
            let positions = [piece.currentPosition]
            positions.push(piece.currentPosition[0] > nextMove[0] ? this.oneLeft(piece.currentPosition) : this.oneRight(piece.currentPosition))
            positions.forEach((position) => {
                let board2 = JSON.parse(JSON.stringify(chessBoard))
                let piece2 = JSON.parse(JSON.stringify(piece))
                board2[piece2.currentPosition].piece = null
                piece2.currentPosition = position
                board2[position].piece = piece2

                this.opponentPieces(board2, opponentColor).forEach((eachPiece) => {
                  if(this.inCheck(eachPiece, board2, gameMoves)) {
                    result = false
                  }
                })
            })
        }

        return result
    }

    opponentPieces(board, opponentColor) {
        return Object.values(board)
            .map((square) => square.piece)
            .filter((piece) => piece)
            .filter((piece) => {
                return (piece.color === opponentColor && piece.type !== 'king')
        })
    }

    kingCastle(piece, nextMove) {
        return piece.type === 'king' &&
            Math.abs(LETTER_KEY[piece.currentPosition[0]] - LETTER_KEY[nextMove[0]]) === 2
    }

    kingLocation(board, color) {
      return Object.values(board).filter((square) => {
        return(
            square.piece &&
            square.piece.type === 'king' &&
            square.piece.color === color
        )
      })[0].piece.currentPosition
    }

    opponentColor(piece) {
        return piece.color === 'white' ? 'black' : 'white'
    }

    getColor(position, board) {
        return board[position].piece.color
    }

    inCheck(piece, chessBoard, gameMoves) {
        return this.validMove(
            piece,
            this.kingLocation(chessBoard, this.opponentColor(piece)),
            chessBoard, gameMoves
        )
    }

    validMove(piece, nextMove, board, gameMoves) {
        return this.movesForPiece(piece, board, gameMoves).includes(nextMove) &&
            this.validMovePath(piece.currentPosition, nextMove, board) &&
            this.validDestination(board, piece.color, nextMove)
    }

    movesForPiece(piece, board, gameMoves) {
        let types = {
            pawn: this.movesForPawn(piece.currentPosition, board, gameMoves),
            knight: this.movesForKnight(piece.currentPosition),
            bishop: this.movesForBishop(piece.currentPosition),
            rook: this.movesForRook(piece.currentPosition),
            queen: this.movesForQueen(piece.currentPosition),
            king: this.movesForKing(piece.currentPosition, board, gameMoves)
        }
        return types[piece.type]
    }
}

export default MoveLogic
