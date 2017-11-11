import LETTER_KEY from './BoardHelper'

const PIECE_NOTATION_KEY = {
  'knight': 'N',
  'bishop': 'B',
  'rook': 'R',
  'queen': 'Q',
  'king': 'K',
  'pawn': ''
}

export default class MoveLogic {
  createNotation(piece, coordinates, board, gameMoves, pieceType) {
    if (piece.type === 'king' && coordinates[0] &&
      Math.abs(LETTER_KEY[piece.currentPosition[0]] - LETTER_KEY[coordinates[0]]) === 2) {
        return coordinates[0] === 'c' ? 'O-O-O.' : 'O-O.'
    }

    let notation = PIECE_NOTATION_KEY[piece.type]
    notation += this.findStartNotation(piece, coordinates, board, gameMoves)
    notation += this.capturePiece(notation, board, coordinates, piece)
    notation += coordinates
    notation += this.upgradedPawn(piece, pieceType)
    return notation + '.'
  }

  upgradedPawn(piece, pieceType) {
    if (pieceType && pieceType !== piece.type) {
      return '=' + PIECE_NOTATION_KEY[pieceType]
    } else {
      return ''
    }
  }

  capturePiece(notation, board, coordinates, piece) {
    if (board[coordinates].piece) {
      return notation === '' ? piece.currentPosition[0] + 'x' : 'x'
    } else {
      return ''
    }
  }

  findStartNotation(piece, coordinates, board, gameMoves) {
    let startNotation = ''

    let pieces = Object.values(board).filter((boardPiece) => {
      return (boardPiece.piece &&
        boardPiece.piece.color === piece.color &&
        boardPiece.piece.type === piece.type &&
        this.validMove(boardPiece.piece, coordinates, board, gameMoves))
    }).map((boardPiece) => boardPiece.piece)

    if (pieces.length > 1) {
      pieces = this.similarPieces(0, pieces, piece)
      if (pieces.length > 1) {
        pieces = this.similarPieces(1, pieces, piece)
        if (pieces.length > 1) {
          startNotation = piece.currentPosition
        } else {
          startNotation = piece.currentPosition[1]
        }
      } else {
        startNotation = piece.currentPosition[0]
      }
    }

    return startNotation
  }

  similarPieces(index, samePieces, piece) {
    return samePieces.filter((boardPiece) => {
      return boardPiece.currentPosition[index] === piece.currentPosition[index]
    })
  }

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
      return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1], 10))
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
        return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1], 10))
    })
    let piece = board[position].piece

    if(piece.type === 'king' && !piece.hasMoved) {
      let leftRook = board['a' + position[1]].piece
      let rightRook = board['h' + position[1]].piece

      if(leftRook && leftRook.type === 'rook' && !leftRook.hasMoved && !board['b' + position[1]].piece) {
        moves.push(String.fromCharCode(position[0].charCodeAt(0) - 2) + position[1])
      }
      if(rightRook && rightRook.type === 'rook' && !rightRook.hasMoved) {
        moves.push(String.fromCharCode(position[0].charCodeAt(0) + 2) + position[1])
      }
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

  isEnPassant(piece, coordinates, updatedBoard) {
    if(coordinates[0] !== piece.currentPosition[0] &&
      !updatedBoard[coordinates].piece &&
      piece.type === 'pawn') {
        updatedBoard[coordinates[0] + piece.currentPosition[1]].piece = null
    }
    return updatedBoard
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
    let positions = [nextMove]

    if (this.kingCastle(piece, nextMove)) {
      positions.push(piece.currentPosition[0] > nextMove[0] ? this.oneLeft(piece.currentPosition) : this.oneRight(piece.currentPosition))
      positions.push(piece.currentPosition)
    }

    positions.forEach((position) => {
      let board = JSON.parse(JSON.stringify(chessBoard))
      let updatedPiece = JSON.parse(JSON.stringify(piece))
      board[updatedPiece.currentPosition].piece = null
      updatedPiece.currentPosition = position
      board[position].piece = updatedPiece

      this.piecesByColor(board, this.opponentColor(piece.color)).forEach((eachPiece) => {
        if(this.inCheck(eachPiece, board, gameMoves, piece.color)) {
          result = false
        }
      })
    })
    return result
  }

  piecesByColor(board, color) {
    return Object.values(board)
      .map((square) => square.piece)
      .filter((piece) => piece)
      .filter((piece) => {
        return (piece.color === color)
    })
  }

  kingCastle(piece, nextMove) {
    return piece.type === 'king' &&
      Math.abs(LETTER_KEY[piece.currentPosition[0]] - LETTER_KEY[nextMove[0]]) === 2
  }

  isCastle(piece, coordinates, updatedBoard) {
    if(piece.type === 'king' && piece.currentPosition[0] === 'e' && ['c', 'g'].includes(coordinates[0])) {
      let oldColumn
      let newColumn

      if (piece.currentPosition[0] > coordinates[0]) {
        oldColumn = 'a'
        newColumn = 'd'
      } else {
        oldColumn = 'h'
        newColumn = 'f'
      }
      let rook = updatedBoard[oldColumn + coordinates[1]].piece

      rook.currentPosition = (newColumn + coordinates[1])
      updatedBoard[oldColumn + coordinates[1]].piece = null
      updatedBoard[newColumn + coordinates[1]].piece = rook
    }
    return updatedBoard
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

  opponentColor(color) {
    return color === 'white' ? 'black' : 'white'
  }

  getColor(position, board) {
    return board[position].piece.color
  }

  inCheck(piece, chessBoard, gameMoves, color) {
    return this.validMove(
      piece,
      this.kingLocation(chessBoard, color),
      chessBoard, gameMoves
    )
  }

  checkmate(chessBoard, gameMoves, color) {
    return this.cannotMove(chessBoard, gameMoves, color) &&
      this.currentThreats(chessBoard, gameMoves, color).length > 0
  }

  stalemate(chessBoard, gameMoves, color) {
    let caseOne = (this.cannotMove(chessBoard, gameMoves, color) &&
      this.currentThreats(chessBoard, gameMoves, color).length === 0)

    let caseTwo = this.insufficientPieces(chessBoard, 'white') &&
      this.insufficientPieces(chessBoard, 'black')
    return caseOne || caseTwo
  }

  insufficientPieces(chessBoard, color) {
    let lessThanThree = this.piecesByColor(chessBoard, color).length < 3
    let onlyBishopOrKnight = true

    this.piecesByColor(chessBoard, color).forEach((piece) => {
      if (!['bishop', 'knight', 'king'].includes(piece.type)) {
        onlyBishopOrKnight = false
      }
    })

    return lessThanThree && onlyBishopOrKnight
  }

  currentThreats(chessBoard, gameMoves, color) {
    return this.piecesByColor(chessBoard, this.opponentColor(color)).filter((piece) => {
      return this.inCheck(piece, chessBoard, gameMoves, color)
    })
  }

  cannotMove(chessBoard, gameMoves, color) {
    let result = true

    this.piecesByColor(chessBoard, color).forEach((piece) => {
      if(this.movesForPiece(piece, chessBoard, gameMoves).filter((move) => {
        return this.validMove(piece, move, chessBoard, gameMoves) &&
            this.kingIsSafe(piece, move, chessBoard, gameMoves)
      }).length > 0) {
        result = false
      }
    })
    return result
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

  setBoard(gameMoves, board) {
    let piecesAndMoves = {}

    Object.values(board).forEach((square) => {
      if(square.piece) {
        piecesAndMoves[square.piece.startIndex] = square.piece.currentPosition
      }
    })

    gameMoves.forEach((piece) => {
      board = this.isCastle(board[piecesAndMoves[piece.startIndex]].piece, piece.currentPosition, board)
      board = this.isEnPassant(board[piecesAndMoves[piece.startIndex]].piece, piece.currentPosition, board)

      board[piecesAndMoves[piece.startIndex]].piece = null
      board[piece.currentPosition].piece = piece
      piecesAndMoves[piece.startIndex] = piece.currentPosition
    })
    return board
  }
}
