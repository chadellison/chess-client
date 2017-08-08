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

  static nthMovesUpAndDown(position) {
      let possibleMoves = []

      let coordinates = this.convertCoordinates(position)

      let lettersToRight = this.moveCount(position).right
      let lettersToLeft = this.moveCount(position).left
      let numbersUp = this.moveCount(position).up
      let numbersDown = this.moveCount(position).down

      return possibleMoves.concat(this.rightAndLeft(lettersToRight, position[0], '+', position[1]))
          .concat(this.rightAndLeft(lettersToLeft, position[0], '-', position[1]))
          .concat(this.upAndDown(numbersUp, position[0], '+', coordinates[1]))
          .concat(this.upAndDown(numbersDown, position[0], '-', coordinates[1]))
  }

  static nthMovesDiagonal(position) {
      let possibleMoves = []

      let coordinates = this.convertCoordinates(position)

      let lettersToRight = this.moveCount(position).right
      let lettersToLeft = this.moveCount(position).left
      let numbersUp = this.moveCount(position).up
      let numbersDown = this.moveCount(position).down

      this.convertCoordinates(position)

      return possibleMoves.concat(this.diagonal(this.lesserPosition(lettersToRight, numbersUp), '+', '+', position[0], coordinates[1]))
          .concat(this.diagonal(this.lesserPosition(lettersToLeft, numbersUp), '+', '-', position[0], coordinates[1]))
          .concat(this.diagonal(this.lesserPosition(lettersToRight, numbersDown), '-', '+', position[0], coordinates[1]))
          .concat(this.diagonal(this.lesserPosition(lettersToLeft, numbersDown), '-', '-', position[0], coordinates[1]))
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

  static convertCoordinates(position) {
      return position.split('').map((coordinate) => {
          if (LETTER_KEY[coordinate]) {
              return LETTER_KEY[coordinate]
          } else {
              return parseInt(coordinate)
          }
      })
  }

  static validMovePath(startPosition, coordinates, currentBoard) {
      let valid = true
      let moves = []

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
          if (currentBoard[move].piece) {
              valid = false
          }
      })

      return valid
  }

  static validateDestination(selected, destination, chessBoard) {
    console.log(selected + " " + destination + " ")
      if(chessBoard[destination].piece) {
          return !(selected.color === chessBoard[destination].piece.color)
      } else {
          return true
      }
  }
}

module.exports = MoveLogic
