import jsonChessBoard from './jsonChessBoard'
import MoveLogic from './helpers/MoveLogic'

describe('MoveLogic', () => {
    describe('#movesForRook', () => {
        it('returns an array of possible moves for a rook on an open board given a position', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "a1"
            }

            let rookMoves = ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesForRook()).toEqual(rookMoves)
        })

        it('returns an array of possible moves for a rook on an open board given a different position', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "d4"
            }

            let rookMoves = ["c4", "b4", "a4", "e4", "f4", "g4", "h4", "d5", "d6", "d7", "d8", "d3", "d2", "d1"]
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesForRook()).toEqual(rookMoves)
        })
    })

    describe('#movesLeft', () => {
        it('retruns an array of all moves from the current position to the a column', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "d3"
            }
            let moves = ['c3', 'b3', 'a3']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesLeft()).toEqual(moves)
        })

        it('retruns an empty array if the current position is on column a', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "a3"
            }

            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesLeft()).toEqual(moves)
        })
    })

    describe('#movesRight', () => {
        it('retruns an array of all moves from the current position to the h column', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "b6"
            }

            let moves = ['c6', 'd6', 'e6', 'f6', 'g6', 'h6']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesRight()).toEqual(moves)
        })

        it('retruns an empty array if the current position is on column h', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "h8"
            }

            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesRight()).toEqual(moves)
        })
    })

    describe('#movesUp', () => {
        it('retruns an array of all moves from the current position to row 8', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "f4"
            }

            let moves = ['f5', 'f6', 'f7', 'f8']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesUp()).toEqual(moves)
        })

        it('retruns an empty array if the current position is on row 8', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "h8"
            }
            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesUp()).toEqual(moves)
        })
    })

    describe('#movesDown', () => {
        it('retruns an array of all moves from the current position to row 8', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "e6"
            }

            let moves = ['e5', 'e4', 'e3', 'e2', 'e1']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesDown()).toEqual(moves)
        })

        it('retruns an empty array if the current position is on row 8', () => {
            let rook = {
              "type": "rook",
              "color": "black",
              "currentPosition": "e1"
            }

            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(rook, board)
            expect(moveLogic.movesDown()).toEqual(moves)
        })
    })

    describe('#movesForBishop', () => {
        it('returns the number of possible moves for a bishop starting at c4', () => {
            let bishop = {
              "type": "bishop",
              "color": "black",
              "currentPosition": "c4"
            }

            let moves = ["d5", "b5", "b3", "d3", "e6", "a6", "a2", "e2", "f7", "f1", "g8"]
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(bishop, board)
            expect(moveLogic.movesForBishop()).toEqual(moves)
        })

        it('returns the number of possible moves for a bishop starting at g2', () => {
            let bishop = {
              "type": "bishop",
              "color": "black",
              "currentPosition": "g2"
            }

            let moves = ["h3", "f3", "f1", "h1", "e4", "d5", "c6", "b7", "a8"]
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(bishop, board)
            expect(moveLogic.movesForBishop()).toEqual(moves)
        })

        it('returns the number of possible moves for a bishop starting at e7', () => {
            let bishop = {
              "type": "bishop",
              "color": "black",
              "currentPosition": "e7"
            }

            let moves = ["f8", "d8", "d6", "f6", "c5", "g5", "b4", "h4", "a3"]
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(bishop, board)
            expect(moveLogic.movesForBishop()).toEqual(moves)
        })
    })

    describe('#movesForQueen', () => {
        it('calculates all possible moves for a piece in every direction given a coordinate', () => {
            let queen = {
              "type": "queen",
              "color": "black",
              "currentPosition": "d4"
            }

            let moves = ["c4", "b4", "a4", "e4", "f4", "g4", "h4", "d5", "d6",
                          "d7", "d8", "d3", "d2", "d1", "e5", "c5", "c3", "e3",
                          "f6", "b6", "b2", "f2", "g7", "a7", "a1", "g1", "h8"]

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(queen, board)
            expect(moveLogic.movesForQueen()).toEqual(moves)
        })
    })

    // describe('#diagonal', () => {
    //     xit('returns an array of possible moves given a count, positive verticalDirection, positive horizontalDirection operator, and a column of c and a row of 4', () => {
    //         let moves = ['d5', 'e6', 'f7', 'g8']
    //         expect(MoveLogic.diagonal(4, '+', '+', 'c', 4)).toEqual(moves)
    //     })
    //
    //     xit('returns an array of possible moves given a count, positive verticalDirection, negative horizontalDirection operator, and a column of c and a row of 4', () => {
    //         let moves = ['b5', 'a6']
    //         expect(MoveLogic.diagonal(2, '+', '-', 'c', 4)).toEqual(moves)
    //     })
    //
    //     xit('returns an array of possible moves given a count, negative verticalDirection, positive horizontalDirection operator, and a column of c and a row of 4', () => {
    //         let moves = ['d3', 'e2', 'f1']
    //         expect(MoveLogic.diagonal(3, '-', '+', 'c', 4)).toEqual(moves)
    //     })
    //
    //     xit('returns an array of possible moves given a count, negative verticalDirection, negative horizontalDirection operator, and a column of c and a row of 4', () => {
    //         let moves = ['b3', 'a2']
    //         expect(MoveLogic.diagonal(2, '-', '-', 'c', 4)).toEqual(moves)
    //     })
    // })

    describe('#validMovePath', () => {
        it('returns true if there are no pieces in the way of the two coordinates going up', () => {
            let queen = {
              "type": "queen",
              "color": "black",
              "currentPosition": "d4"
            }
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic(queen, board)
            expect(moveLogic.validMovePath()).toEqual(true)
        })

        xit('returns true if there are no pieces in the way of the two coordinates going down', () => {
            expect(MoveLogic.validMovePath('d7', 'd5', jsonChessBoard)).toEqual(true)
        })

        xit('returns false if there are any pieces in the way of the two coordinates going up', () => {
            expect(MoveLogic.validMovePath('d1', 'd3', jsonChessBoard)).toEqual(false)
        })

        xit('returns false if there are any pieces in the way of the two coordinates going down', () => {
            expect(MoveLogic.validMovePath('a8', 'a5', jsonChessBoard)).toEqual(false)
        })

        xit('returns true for horizontal moves moving right if there are no pieces in the way of the two coordinates', () => {
            const rook = {
                'type': 'rook',
                'color': 'black',
                'currentPosition': 'b5'
            }

            jsonChessBoard.b5.piece = rook
            expect(MoveLogic.validMovePath('b5', 'f5', jsonChessBoard)).toEqual(true)

            jsonChessBoard.b5.piece = null
        })

        xit('returns true for horizontal moves moving left if there are no pieces in the way of the two coordinates', () => {
            const queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'g5'
            }

            jsonChessBoard.g5.piece = queen
            expect(MoveLogic.validMovePath('g5', 'a5', jsonChessBoard)).toEqual(true)

            jsonChessBoard.g5.piece = null
        })

        xit('returns false for horizontal moves moving left if there are any pieces in the way of the two coordinates', () => {
            const queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'd6'
            }

            const pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'b6'
            }

            jsonChessBoard.d6.piece = queen
            jsonChessBoard.b6.piece = pawn

            expect(MoveLogic.validMovePath('d6', 'a6', jsonChessBoard))

            jsonChessBoard.d6.piece = null
            jsonChessBoard.b6.piece = null
        })

        xit('returns false for horizontal moves moving right if there are any pieces in the way of the two coordinates', () => {
            const queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'a6'
            }

            const pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'c6'
            }

            jsonChessBoard.a6.piece = queen
            jsonChessBoard.c6.piece = pawn

            expect(MoveLogic.validMovePath('a6', 'd6', jsonChessBoard)).toEqual(false)

            jsonChessBoard.c6.piece = null
            jsonChessBoard.a6.piece = null
        })

        xit('it returns true for up right diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'c3'
            }

            jsonChessBoard.c3.piece = bishop
            expect(MoveLogic.validMovePath('c3', 'f6', jsonChessBoard)).toEqual(true)
            jsonChessBoard.c3.piece = null
        })

        xit('it returns false for up right diagonal moves when pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'f6'
            }

            jsonChessBoard.f6.piece = bishop

            expect(MoveLogic.validMovePath('f6', 'h8', jsonChessBoard)).toEqual(false)

            jsonChessBoard.f6.piece = null
        })

        xit('it returns true for down right diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'c6'
            }

            jsonChessBoard.c6.piece = bishop

            expect(MoveLogic.validMovePath('c6', 'g2', jsonChessBoard)).toEqual(true)
            jsonChessBoard.c6.piece = null
        })

        xit('it returns false for down right diagonal moves when pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'c6'
            }

            jsonChessBoard.c6.piece = bishop

            expect(MoveLogic.validMovePath('c6', 'h1', jsonChessBoard)).toEqual(false)
            jsonChessBoard.c6.piece = null
        })

        xit('it returns true for up left diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'h5'
            }

            jsonChessBoard.h5.piece = bishop
            expect(MoveLogic.validMovePath('h5', 'f7', jsonChessBoard)).toEqual(true)

            jsonChessBoard.h5.piece = null
        })

        xit('it returns false for up left diagonal moves when pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'e5'
            }

            jsonChessBoard.e5.piece = bishop

            expect(MoveLogic.validMovePath('e5', 'b8', jsonChessBoard)).toEqual(false)

            jsonChessBoard.e5.piece = null
        })

        xit('it returns true for down left diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'g4'
            }

            jsonChessBoard.g4.piece = bishop
            expect(MoveLogic.validMovePath('g4', 'e2', jsonChessBoard)).toEqual(true)

            jsonChessBoard.g4.piece = null
        })

        xit('it returns false for down left diagonal moves when pieces are in the path', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'g4'
            }

            jsonChessBoard.g4.piece = bishop
            expect(MoveLogic.validMovePath('g4', 'd1', jsonChessBoard)).toEqual(false)

            jsonChessBoard.g4.piece = null
        })
    })

    describe('#validateDestination', () => {
        xit('returns false if the destination is occuppied by an allied piece', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'c1'
            }
            expect(MoveLogic.validateDestination(bishop, 'd2', jsonChessBoard)).toEqual(false)
        })

        xit('returns true if the destination is an enemy piece', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a6'
            }

            jsonChessBoard.a6.piece = bishop
            expect(MoveLogic.validateDestination(bishop, 'b7', jsonChessBoard)).toEqual(true)

            jsonChessBoard.a6.piece = null
        })

        xit('returns true if the destination is an empty square', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a6'
            }

            jsonChessBoard.a6.piece = bishop
            expect(MoveLogic.validateDestination(bishop, 'b5', jsonChessBoard)).toEqual(true)

            jsonChessBoard.a6.piece = null
        })
    })

    describe('#movesForKnight', () => {
        xit('returns an array of all possible moves for a knight on b1', () => {
            let moves = ['d2', 'c3', 'a3']
            expect(MoveLogic.movesForKnight('b1')).toEqual(moves)
        })

        xit('returns an array of all possible moves for a knight on d5', () => {
            let moves = ['f6', 'f4', 'b6', 'b4', 'e7', 'c7', 'e3', 'c3']
            expect(MoveLogic.movesForKnight('d5')).toEqual(moves)
        })
    })

    describe('#fetchVerticalMoves', () => {
        xit('handles vertical moves', () => {

        })
    })

    describe('#fetchHorizontalMoves', () => {
        xit('handles vertical moves', () => {

        })
    })

    describe('#fetchDiagonalMoves', () => {
        xit('handles vertical moves', () => {

        })
    })

    describe('#kingIsSafe', () => {
        xit('returns true if the king is not in check after the move', () => {
            const queen = {
                'type': 'queen',
                'color': 'white',
                'currentPosition': 'd4'
            }

            jsonChessBoard.d4.piece = queen
            expect(MoveLogic.kingIsSafe(queen, 'd5', jsonChessBoard, 'e1')).toEqual(true)
            jsonChessBoard.d4.piece = null
        })

        xit('returns false if the king is in check after the move', () => {
          const queen = {
              'type': 'queen',
              'color': 'white',
              'currentPosition': 'e4'
          }

          const king = {
              'type': 'king',
              'color': 'white',
              'currentPosition': 'e3'
          }

          const blackQueen = {
              'type': 'queen',
              'color': 'black',
              'currentPosition': 'e6'
          }

          jsonChessBoard.e4.piece = queen
          jsonChessBoard.e3.piece = king
          jsonChessBoard.e6.piece = blackQueen

          expect(MoveLogic.kingIsSafe(queen, 'd5', jsonChessBoard, king.currentPosition)).toEqual(false)
          jsonChessBoard.e4.piece = null
          jsonChessBoard.e3.piece = null
          jsonChessBoard.e6.piece = null
        })
    })

    describe('#inCheck', () => {
      xit('#test', () => {

      })
    })

    describe('#movesForKing', () => {
        xit('returns an array of all of a kings moves on an open board, given a coordinate', () => {
            let moves = ['d3', 'd5', 'e4', 'c4', 'e5', 'e3', 'c5', 'c3']
            expect(MoveLogic.movesForKing('d4')).toEqual(moves)
        })

        xit('returns an array of only three moves when the king is in the corner', () => {
            let moves = ['a2', 'b1', 'b2']
            expect(MoveLogic.movesForKing('a1')).toEqual(moves)
        })

        xit('returns moves for a castle if the king is on e1 or e8', () => {
            let moves = ["e2", "f1", "d1", "f2", "d2", "c1", "g1"]
            expect(MoveLogic.movesForKing('e1')).toEqual(moves)
        })
    })

    describe('#movesForPawn', () => {
        xit('returns an array of all moves for a pawn given a d4 position', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd4'
            }

            let moves = ['d5']
            jsonChessBoard.d4.piece = pawn
            expect(MoveLogic.movesForPawn('d4', pawn.color, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.d4.piece = null
        })

        xit('returns an array of all moves for a pawn given a d2', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd2'
            }
            let moves = ['d3', 'd4']
            expect(MoveLogic.movesForPawn('d2', pawn.color, jsonChessBoard)).toEqual(moves)
        })

        xit('does not return d4 if the square is occupied', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd2'
            }

            let queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'd4'
            }

            let moves = ['d3']
            jsonChessBoard.d4.piece = queen
            expect(MoveLogic.movesForPawn('d2', pawn.color, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.d4.piece = null
        })

        xit('returns an array of all moves for a pawn given a d7', () => {
            let moves = ['d6', 'd5']
            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'd7'
            }
            expect(MoveLogic.movesForPawn('d7', pawn.color, jsonChessBoard)).toEqual(moves)
        })

        xit('does not return d4 if the square is occupied', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'd7'
            }

            let queen = {
                'type': 'queen',
                'color': 'white',
                'currentPosition': 'd5'
            }

            let moves = ['d6']
            jsonChessBoard.d5.piece = queen
            expect(MoveLogic.movesForPawn('d7', pawn.color, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.d5.piece = null
        })

        xit('returns additional moves if a white pawn can capture a piece on the left', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd4'
            }

            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'c5'
            }

            let moves = ['d5', 'c5']

            jsonChessBoard.c5.piece = blackPawn
            jsonChessBoard.d4.piece = pawn

            expect(MoveLogic.movesForPawn('d4', pawn.color, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.c5.piece = null
            jsonChessBoard.d4.piece = null
        })

        xit('does not return additional moves if the piece on the left is an allied pawn', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd4'
            }

            let whitePawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'c5'
            }

            let moves = ['d5']

            jsonChessBoard.c5.piece = whitePawn
            jsonChessBoard.d4.piece = pawn

            expect(MoveLogic.movesForPawn('d4', pawn.color, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.c5.piece = null
            jsonChessBoard.d4.piece = null
        })

        xit('does not return additional moves if the piece on the left is an allied pawn', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd4'
            }

            let whitePawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'c5'
            }

            let moves = ['d5']

            jsonChessBoard.c5.piece = whitePawn
            jsonChessBoard.d4.piece = pawn

            expect(MoveLogic.movesForPawn('d4', pawn.color, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.c5.piece = null
            jsonChessBoard.d4.piece = null
        })

        xit('does not return any moves if the pawn is blocked', () => {
          let pawn = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'd7'
          }

          let queen = {
              'type': 'queen',
              'color': 'white',
              'currentPosition': 'd6'
          }

          let moves = []
          jsonChessBoard.d6.piece = queen
          expect(MoveLogic.movesForPawn('d7', pawn.color, jsonChessBoard)).toEqual(moves)
          jsonChessBoard.d6.piece = null
        })

        xit('returns additional moves if a white pawn can capture a piece on the right', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd4'
            }

            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'c5'
            }

            let moves = ['d5', 'e5']

            jsonChessBoard.e5.piece = blackPawn
            jsonChessBoard.d4.piece = pawn
            pawn.currentPosition = 'd4'

            expect(MoveLogic.movesForPawn('d4', pawn.color, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.e5.piece = null
            jsonChessBoard.d4.piece = null
        })

        xit('returns additional moves if a black pawn can capture a piece on the left', () => {
            let whitePawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'e4'
            }

            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'f5'
            }

            let moves = ['f4', 'e4']

            jsonChessBoard.f5.piece = blackPawn
            jsonChessBoard.e4.piece = whitePawn
            whitePawn.currentPosition = 'e4'
            blackPawn.currentPosition = 'f5'

            expect(MoveLogic.movesForPawn('f5', blackPawn, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.f5.piece = null
            jsonChessBoard.e4.piece = null
        })

        xit('does not return additional moves if the piece on the left is an allied pawn', () => {
            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'e4'
            }

            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'f5'
            }

            let moves = ['f4']

            jsonChessBoard.f5.piece = pawn
            jsonChessBoard.e4.piece = blackPawn
            blackPawn.currentPosition = 'e4'
            pawn.currentPosition = 'f5'

            expect(MoveLogic.movesForPawn('f5', pawn.color, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.f5.piece = null
            jsonChessBoard.e4.piece = null
        })

        xit('returns additional moves if a black pawn can capture a piece on the right', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'c5'
            }

            let whitePawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd4'
            }

            let moves = ['c4', 'd4']

            jsonChessBoard.d4.piece = whitePawn
            jsonChessBoard.c5.piece = pawn

            expect(MoveLogic.movesForPawn('c5', pawn.color, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.d4.piece = null
            jsonChessBoard.c5.piece = null
        })

        xit('does not return additional moves if the piece on the right is another black pawn', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'c5'
            }

            let whitePawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'd4'
            }

            let moves = ['c4']

            jsonChessBoard.d4.piece = whitePawn
            jsonChessBoard.c5.piece = pawn

            expect(MoveLogic.movesForPawn('c5', pawn.color, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.d4.piece = null
            jsonChessBoard.c5.piece = null
        })

        xit('returns additional moves for en passant if applicable', () => {
          let blackPawn = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'c5'
          }

          let whitePawn = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'd5'
          }

          let moves = ['d6', 'c6']

          let gameMoves = [whitePawn, blackPawn]

          jsonChessBoard.d5.piece = whitePawn
          jsonChessBoard.c5.piece = blackPawn
          expect(MoveLogic.movesForPawn('d5', 'white', jsonChessBoard, gameMoves)).toEqual(moves)
          jsonChessBoard.d5.piece = null
          jsonChessBoard.c5.piece = null
        })

        xit('returns additional moves for en passant if applicable for black pawns', () => {
          let blackPawn = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'c4'
          }

          let whitePawn = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'd4'
          }

          let moves = ['c3', 'd3']

          let gameMoves = [blackPawn, whitePawn]

          jsonChessBoard.c4.piece = blackPawn
          jsonChessBoard.d4.piece = whitePawn
          expect(MoveLogic.movesForPawn('c4', 'black', jsonChessBoard, gameMoves)).toEqual(moves)
          jsonChessBoard.c4.piece = null
          jsonChessBoard.d4.piece = null
        })
    })

    describe('#oneForward', () => {
        xit('test', () => {

        })
    })

    describe('#checkProximity', () => {
        xit('test', () => {

        })
    })
    describe('#isOpen', () => {
        xit('test', () => {

        })
    })

    describe('#opponentColor', () => {
        xit('test', () => {

        })
    })

    describe('#movesForPiece', () => {
      xit('test', () => {

      })
    })
})
