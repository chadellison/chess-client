import jsonChessBoard from './jsonChessBoard'
import MoveLogic from './helpers/MoveLogic'

describe('MoveLogic', () => {
    describe('#movesForRook', () => {
        it('returns an array of possible moves for a rook on an open board given a position', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'a1'
            }

            let rookMoves = ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForRook('a1')).toEqual(rookMoves)
        })

        it('returns an array of possible moves for a rook on an open board given a different position', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'd4'
            }

            let rookMoves = ['c4', 'b4', 'a4', 'e4', 'f4', 'g4', 'h4', 'd5', 'd6', 'd7', 'd8', 'd3', 'd2', 'd1']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForRook('d4')).toEqual(rookMoves)
        })
    })

    describe('#movesLeft', () => {
        it('retruns an array of all moves from the current position to the a column', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'd3'
            }
            let moves = ['c3', 'b3', 'a3']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesLeft('d3')).toEqual(moves)
        })

        it('retruns an empty array if the current position is on column a', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'a3'
            }

            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesLeft('a3')).toEqual(moves)
        })
    })

    describe('#movesRight', () => {
        it('retruns an array of all moves from the current position to the h column', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'b6'
            }

            let moves = ['c6', 'd6', 'e6', 'f6', 'g6', 'h6']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesRight('b6')).toEqual(moves)
        })

        it('retruns an empty array if the current position is on column h', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'h8'
            }

            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesRight('h8')).toEqual(moves)
        })
    })

    describe('#movesUp', () => {
        it('retruns an array of all moves from the current position to row 8', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'f4'
            }

            let moves = ['f5', 'f6', 'f7', 'f8']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesUp('f4')).toEqual(moves)
        })

        it('retruns an empty array if the current position is on row 8', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'h8'
            }
            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesUp('h8')).toEqual(moves)
        })
    })

    describe('#movesDown', () => {
        it('retruns an array of all moves from the current position to row 8', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'e6'
            }

            let moves = ['e5', 'e4', 'e3', 'e2', 'e1']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesDown('e6')).toEqual(moves)
        })

        it('retruns an empty array if the current position is on row 8', () => {
            let rook = {
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'e1'
            }

            let moves = []
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesDown('e1')).toEqual(moves)
        })
    })

    describe('#movesForBishop', () => {
        it('returns the number of possible moves for a bishop starting at c4', () => {
            let bishop = {
              'type': 'bishop',
              'color': 'black',
              'currentPosition': 'c4'
            }

            let moves = ['d5', 'b5', 'b3', 'd3', 'e6', 'a6', 'a2', 'e2', 'f7', 'f1', 'g8']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForBishop('c4')).toEqual(moves)
        })

        it('returns the number of possible moves for a bishop starting at g2', () => {
            let bishop = {
              'type': 'bishop',
              'color': 'black',
              'currentPosition': 'g2'
            }

            let moves = ['h3', 'f3', 'f1', 'h1', 'e4', 'd5', 'c6', 'b7', 'a8']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForBishop('g2')).toEqual(moves)
        })

        it('returns the number of possible moves for a bishop starting at e7', () => {
            let bishop = {
              'type': 'bishop',
              'color': 'black',
              'currentPosition': 'e7'
            }

            let moves = ['f8', 'd8', 'd6', 'f6', 'c5', 'g5', 'b4', 'h4', 'a3']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForBishop('e7')).toEqual(moves)
        })
    })

    describe('#movesForQueen', () => {
        it('calculates all possible moves for a piece in every direction given a coordinate', () => {
            let queen = {
              'type': 'queen',
              'color': 'black',
              'currentPosition': 'd4'
            }

            let moves = ['c4', 'b4', 'a4', 'e4', 'f4', 'g4', 'h4', 'd5', 'd6',
                          'd7', 'd8', 'd3', 'd2', 'd1', 'e5', 'c5', 'c3', 'e3',
                          'f6', 'b6', 'b2', 'f2', 'g7', 'a7', 'a1', 'g1', 'h8']

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForQueen('d4')).toEqual(moves)
        })
    })

    describe('#validMovePath', () => {
        it('returns true if there are no pieces in the way of the two coordinates going up', () => {
            let queen = {
              'type': 'queen',
              'color': 'black',
              'currentPosition': 'd2'
            }
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.validMovePath('d2', 'd4', board)).toEqual(true)
        })

        it('returns true if there are no pieces in the way of the two coordinates going down', () => {
            let queen = {
              'type': 'queen',
              'color': 'black',
              'currentPosition': 'd7'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.validMovePath('d7', 'd5', board)).toEqual(true)
        })

        it('returns false if there are any pieces in the way of the two coordinates going up', () => {
            let queen = {
              'type': 'queen',
              'color': 'black',
              'currentPosition': 'd1'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('d1', 'd3', board)).toEqual(false)
        })

        it('returns false if there are any pieces in the way of the two coordinates going down', () => {
            let queen = {
              'type': 'queen',
              'color': 'black',
              'currentPosition': 'a8'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('a8', 'a5', board)).toEqual(false)
        })

        it('returns true for horizontal moves moving right if there are no pieces in the way of the two coordinates', () => {
            let rook = {
                'type': 'rook',
                'color': 'black',
                'currentPosition': 'b5'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('b5', 'f5', board)).toEqual(true)
        })

        it('returns true for horizontal moves moving left if there are no pieces in the way of the two coordinates', () => {
            let queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'g5'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('g5', 'a5', board)).toEqual(true)
        })

        it('returns false for horizontal moves moving left if there are any pieces in the way of the two coordinates', () => {
            let queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'd6'
            }

            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'b6'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.d6.piece = queen
            board.b6.piece = pawn
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('d6', 'a6', board)).toEqual(false)
        })

        it('returns false for horizontal moves moving right if there are any pieces in the way of the two coordinates', () => {
            let queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'a6'
            }

            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'c6'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.a6.piece = queen
            board.c6.piece = pawn
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('a6', 'd6', board)).toEqual(false)
        })

        it('it returns true for up right diagonal moves when no pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'c3'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('c3', 'f6', board)).toEqual(true)
        })

        it('it returns false for up right diagonal moves when pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'f6'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('f6', 'h8', board)).toEqual(false)
        })

        it('it returns true for down right diagonal moves when no pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'c6'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('c6', 'g2', board)).toEqual(true)
        })

        it('it returns false for down right diagonal moves when pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'c6'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('c6', 'h1', board)).toEqual(false)
        })

        it('it returns true for up left diagonal moves when no pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'h5'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('h5', 'f7', board)).toEqual(true)
        })

        it('it returns false for up left diagonal moves when pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'e5'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('e5', 'b8', board)).toEqual(false)
        })

        it('it returns true for down left diagonal moves when no pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'g4'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('g4', 'e2', board)).toEqual(true)
        })

        it('it returns false for down left diagonal moves when pieces are in the path', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'g4'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('g4', 'd1', board)).toEqual(false)
        })

        it('it returns true for a queen on a4 to e8 when the path is open', () => {
            let queen = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a4'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.d7.piece = null
            board.a4.piece = queen
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('a4', 'e8', board)).toEqual(true)
        })

        it('it returns false for a queen on a4 to e8 when the path is not open', () => {
            let queen = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a4'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.a4.piece = queen
            let moveLogic = new MoveLogic()

            expect(moveLogic.validMovePath('a4', 'e8', board)).toEqual(false)
        })
    })

    describe('#validDestination', () => {
        it('returns false if the destination is occuppied by an allied piece', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'c1'
            }
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validDestination(board, bishop.color, 'd2')).toEqual(false)
        })

        it('returns true if the destination is an enemy piece', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a6'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validDestination(board, bishop.color, 'b7')).toEqual(true)
        })

        it('returns true if the destination is an empty square', () => {
            let bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a6'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.validDestination(board, bishop.color, 'b5')).toEqual(true)
        })
    })

    describe('#movesForKnight', () => {
        it('returns an array of all possible moves for a knight on b1', () => {
            let knight = {
                'type': 'knight',
                'color': 'white',
                'currentPosition': 'b1'
            }

            let moves = ['d2', 'c3', 'a3']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForKnight('b1')).toEqual(moves)
        })

        it('returns an array of all possible moves for a knight on d5', () => {
            let knight = {
                'type': 'knight',
                'color': 'white',
                'currentPosition': 'd5'
            }

            let moves = ["b6", "b4", "f6", "f4", "e7", "c7", "e3", "c3"]
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForKnight('d5')).toEqual(moves)
        })
    })

    describe('#kingIsSafe', () => {
        xit('returns true if the king is not in check after the move', () => {
            const queen = {
                'type': 'queen',
                'color': 'white',
                'currentPosition': 'd4'
            }
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.d4.piece = queen
            let moveLogic = new MoveLogic()
            expect(moveLogic.kingIsSafe(queen, 'd5', jsonChessBoard, 'e1')).toEqual(true)
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

          let board = JSON.parse(JSON.stringify(jsonChessBoard))
          board.e4.piece = queen
          board.e3.piece = king
          board.e6.piece = blackQueen
          let moveLogic = new MoveLogic()
          expect(moveLogic.kingIsSafe(queen, 'd5', jsonChessBoard, king.currentPosition)).toEqual(false)
        })
    })

    describe('#inCheck', () => {
      xit('#test', () => {

      })
    })

    describe('#movesForKing', () => {
        it('returns an array of all of a kings moves on an open board, given a coordinate', () => {
            let king = {
                'type': 'king',
                'color': 'whtie',
                'currentPosition': 'd4'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            let gameMoves = [king]
            board.d4.piece = king

            let moves = ['c4', 'e4', 'd5', 'd3', 'e5', 'c5', 'c3', 'e3']
            expect(moveLogic.movesForKing('d4', board, gameMoves)).toEqual(moves)
        })

        it('returns an array of only three moves when the king is in the corner', () => {
            let king = {
                'type': 'king',
                'color': 'whtie',
                'currentPosition': 'a1',
                'hasMoved': true
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            let moves = ['b1', 'a2', 'b2']
            board.a1.piece = king
            let gameMoves = [king]

            expect(moveLogic.movesForKing('a1', board, gameMoves)).toEqual(moves)
        })

        it('returns moves for a castle if the king is on e1 and has not moved and no piece is on b1', () => {
            let king = {
                'type': 'king',
                'color': 'whtie',
                'currentPosition': 'e1'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.b1.piece = null
            let moveLogic = new MoveLogic()
            let gameMoves = []

            let moves = ['d1', 'f1', 'e2', 'f2', 'd2', 'c1', 'g1']
            expect(moveLogic.movesForKing('e1', board, gameMoves)).toEqual(moves)
        })

        it('returns moves that are not for a castle on the left if the king is on e1 and a knight is on b1', () => {
            let king = {
                'type': 'king',
                'color': 'whtie',
                'currentPosition': 'e1'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            let gameMoves = []

            let moves = ['d1', 'f1', 'e2', 'f2', 'd2', 'g1']
            expect(moveLogic.movesForKing('e1', board, gameMoves)).toEqual(moves)
        })

        it('returns moves for a castle if the king is on e8 and has not moved and a piece is not on b8', () => {
            let king = {
                'type': 'king',
                'color': 'whtie',
                'currentPosition': 'e8'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.b8.piece = null
            let moveLogic = new MoveLogic()
            let gameMoves = []

            let moves = ['d8', 'f8', 'e7', 'd7', 'f7', 'c8', 'g8']
            expect(moveLogic.movesForKing('e8', board, gameMoves)).toEqual(moves)
        })

        it('returns does not return moves for a castle on the left if the king is on e8 and has not moved and a piece is on b8', () => {
            let king = {
                'type': 'king',
                'color': 'whtie',
                'currentPosition': 'e8'
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let moveLogic = new MoveLogic()
            let gameMoves = []

            let moves = ['d8', 'f8', 'e7', 'd7', 'f7', 'g8']
            expect(moveLogic.movesForKing('e8', board, gameMoves)).toEqual(moves)
        })

        it('does not return moves for a castle if the king is on e1 and has moved', () => {
            let king = {
                'type': 'king',
                'color': 'whtie',
                'currentPosition': 'e1',
                'hasMoved': true
            }

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.e1.piece = king
            let moveLogic = new MoveLogic()
            let gameMoves = [king]

            let moves = ['d1', 'f1', 'e2', 'f2', 'd2']
            expect(moveLogic.movesForKing('e1', board, gameMoves)).toEqual(moves)
        })

        xit('test', () => {

        })
    })

    describe('#movesForPawn', () => {
        it('returns an array of all moves for a pawn given a d4 position', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd4'
            }

            let moves = ['d5']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let gameMoves = []
            let moveLogic = new MoveLogic()
            board.d4.piece = pawn
            expect(moveLogic.movesForPawn('d4', board, gameMoves)).toEqual(moves)
        })

        it('returns an array of all moves for a pawn given a d2', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd2'
            }
            let moves = ['d3', 'd4']
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let gameMoves = []
            let moveLogic = new MoveLogic()
            board.d2.piece = pawn
            expect(moveLogic.movesForPawn('d2', board, gameMoves)).toEqual(moves)
        })

        it('does not return d4 if the square is occupied', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.d4.piece = queen
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('d2', board, gameMoves)).toEqual(moves)
        })

        it('returns an array of all moves for a pawn given a d7', () => {
            let moves = ['d6', 'd5']
            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'd7'
            }
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            let gameMoves = []
            let moveLogic = new MoveLogic()
            expect(moveLogic.movesForPawn('d7', board, gameMoves)).toEqual(moves)
        })

        it('does not return d4 if the square is occupied', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.d5.piece = queen
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('d7', board, gameMoves)).toEqual(moves)
        })

        it('returns additional moves if a white pawn can capture a piece on the left', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.c5.piece = blackPawn
            board.d4.piece = pawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('d4', board, gameMoves)).toEqual(moves)
        })

        it('does not return additional moves if the piece on the left is an allied pawn', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.c5.piece = whitePawn
            board.d4.piece = pawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('d4', board, gameMoves)).toEqual(moves)
        })

        it('does not return additional moves if the piece on the left is an allied pawn', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.c5.piece = whitePawn
            board.d4.piece = pawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('d4', board, gameMoves)).toEqual(moves)
        })

        it('does not return any moves if the pawn is blocked', () => {
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
          let board = JSON.parse(JSON.stringify(jsonChessBoard))
          board.d6.piece = queen
          let gameMoves = []
          let moveLogic = new MoveLogic()

          expect(moveLogic.movesForPawn('d7', board, gameMoves)).toEqual(moves)
        })

        it('returns additional moves if a white pawn can capture a piece on the right', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.e5.piece = blackPawn
            board.d4.piece = pawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('d4', board, gameMoves)).toEqual(moves)
        })

        it('returns additional moves if a black pawn can capture a piece on the left', () => {
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

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.e4.piece = whitePawn
            board.f5.piece = blackPawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('f5', board, gameMoves)).toEqual(moves)
        })

        it('does not return additional moves if the piece on the left is an allied pawn', () => {
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

            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.e4.piece = blackPawn
            board.f5.piece = pawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('f5', board, gameMoves)).toEqual(moves)
        })

        it('returns additional moves if a black pawn can capture a piece on the right', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.c5.piece = pawn
            board.d4.piece = whitePawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('c5', board, gameMoves)).toEqual(moves)
        })

        it('does not return additional moves if the piece on the right is another black pawn', () => {
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
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            board.d4.piece = whitePawn
            board.c5.piece = pawn
            let gameMoves = []
            let moveLogic = new MoveLogic()

            expect(moveLogic.movesForPawn('c5', board, gameMoves)).toEqual(moves)
        })

        it('returns additional moves for en passant if applicable', () => {
          let blackPawn = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'c5',
              'movedTwo': true
          }

          let whitePawn = {
              'type': 'pawn',
              'color': 'white',
              'currentPosition': 'd5'
          }

          let moves = ['d6', 'c6']

          let board = JSON.parse(JSON.stringify(jsonChessBoard))
          board.c5.piece = blackPawn
          board.d5.piece = whitePawn
          let gameMoves = [whitePawn, blackPawn]
          let moveLogic = new MoveLogic()

          expect(moveLogic.movesForPawn('d5', board, gameMoves)).toEqual(moves)
        })

        it('returns additional moves for en passant if applicable for black pawns', () => {
          let blackPawn = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'c4'
          }

          let whitePawn = {
              'type': 'pawn',
              'color': 'white',
              'currentPosition': 'd4',
              'movedTwo': true
          }

          let moves = ['c3', 'd3']

          let gameMoves = [blackPawn, whitePawn]
          let board = JSON.parse(JSON.stringify(jsonChessBoard))
          board.c4.piece = blackPawn
          board.d4.piece = whitePawn
          let moveLogic = new MoveLogic()

          expect(moveLogic.movesForPawn('c4', board, gameMoves)).toEqual(moves)
        })
    })

    describe('#oneForward', () => {
        xit('test', () => {

        })
    })

    describe('#oneLeft', () => {
        xit('test', () => {

        })
    })

    describe('#oneRight', () => {
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

    describe('#canCapturePiece', () => {
      xit('test', () => {

      })
    })

    describe('#checkDiagonal', () => {
      xit('test', () => {

      })
    })

    describe('#validCoordinates', () => {
      xit('test', () => {

      })
    })

    describe('#kingLocation', () => {
      xit('test', () => {

      })
    })

    describe('#validMove', () => {
      xit('test', () => {

      })
    })

    describe('#getColor', () => {
      xit('test', () => {

      })
    })

    describe('#kingCastle', () => {
      xit('test', () => {

      })
    })

    describe('#piecesByColor', () => {
      xit('test', () => {

      })
    })

    describe('#checkmate', () => {
        it('returns true when the king is in checkmate', () => {
            let whitePawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'e4',
                'hasMoved': true,
                'movedTwo': true
            }

            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'e5',
                'hasMoved': true,
                'movedTwo': true
            }

            let bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'c4',
                'hasMoved': true
            }

            let leftKnight = {
                'type': 'knight',
                'color': 'black',
                'currentPosition': 'c6',
                'hasMoved': true
            }

            let queenFirstMove = {
                'type': 'queen',
                'color': 'white',
                'currentPosition': 'h5',
                'hasMoved': true
            }

            let rightKnight = {
                'type': 'knight',
                'color': 'black',
                'currentPosition': 'f6',
                'hasMoved': true
            }


            let queen = {
                'type': 'queen',
                'color': 'white',
                'currentPosition': 'f7',
                'hasMoved': true
            }

          let gameMoves = [whitePawn,
              blackPawn,
              bishop,
              leftKnight,
              queenFirstMove,
              rightKnight,
              queen
          ]

          let board = JSON.parse(JSON.stringify(jsonChessBoard))

          board.e4.piece = JSON.parse(JSON.stringify(whitePawn))
          board.e5.piece = JSON.parse(JSON.stringify(blackPawn))
          board.c4.piece = JSON.parse(JSON.stringify(bishop))
          board.c6.piece = JSON.parse(JSON.stringify(leftKnight))
          board.f6.piece = JSON.parse(JSON.stringify(rightKnight))
          board.f7.piece = JSON.parse(JSON.stringify(queen))

          board.e2.piece = null
          board.e7.piece = null
          board.f1.piece = null
          board.b8.piece = null
          board.g8.piece = null
          board.d1.piece = null

          let moveLogic = new MoveLogic()

          expect(moveLogic.checkmate(board, gameMoves, 'black')).toEqual(true)
        })

        it('returns false when the king is not in checkmate', () => {
            let whitePawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'e4',
                'hasMoved': true,
                'movedTwo': true
            }

            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'e5',
                'hasMoved': true,
                'movedTwo': true
            }

            let bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'c4',
                'hasMoved': true
            }

            let leftKnight = {
                'type': 'knight',
                'color': 'black',
                'currentPosition': 'c6',
                'hasMoved': true
            }

            let queenFirstMove = {
                'type': 'queen',
                'color': 'white',
                'currentPosition': 'h5',
                'hasMoved': true
            }

            let rightKnight = {
                'type': 'knight',
                'color': 'black',
                'currentPosition': 'f6',
                'hasMoved': true
            }

          let gameMoves = [whitePawn,
              blackPawn,
              bishop,
              leftKnight,
              queenFirstMove,
              rightKnight
          ]

          let board = JSON.parse(JSON.stringify(jsonChessBoard))
          board.e2.piece = null
          board.e7.piece = null
          board.f1.piece = null
          board.b8.piece = null
          board.g8.piece = null
          board.d1.piece = null

          board.e4.piece = JSON.parse(JSON.stringify(whitePawn))
          board.e5.piece = JSON.parse(JSON.stringify(blackPawn))
          board.c4.piece = JSON.parse(JSON.stringify(bishop))
          board.c6.piece = JSON.parse(JSON.stringify(leftKnight))
          board.h5.piece = JSON.parse(JSON.stringify(queenFirstMove))
          board.f6.piece = JSON.parse(JSON.stringify(rightKnight))
          let moveLogic = new MoveLogic()
          expect(moveLogic.checkmate(board, gameMoves, 'black')).toEqual(false)
        })
    })

    describe('#stalemate', () => {
        it('returns true when the king white cannot move anywhere and the king is not in check', () => {
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            Object.values(board).forEach((square) => {
                if(square.piece) {
                    board[square.piece.currentPosition].piece = null
                }
            })

            let blackKing = {
                'type': 'king',
                'color': 'black',
                'currentPosition': 'd3',
                'hasMoved': true
            }

            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'd2',
                'hasMoved': true
            }

            let whiteKing = {
                'type': 'king',
                'color': 'white',
                'currentPosition': 'd1',
                'hasMoved': true
            }

            board.d3.piece = blackKing
            board.d2.piece = blackPawn
            board.d1.piece = whiteKing

            let moveLogic = new MoveLogic()
            let gameMoves = []
            let color = 'white'

            expect(moveLogic.stalemate(board, gameMoves, color)).toEqual(true)
        })

        it('returns false when the white king can move', () => {
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            Object.values(board).forEach((square) => {
                if(square.piece) {
                    board[square.piece.currentPosition].piece = null
                }
            })

            let blackKing = {
                'type': 'king',
                'color': 'black',
                'currentPosition': 'd3',
                'hasMoved': true
            }

            let blackPawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'd2',
                'hasMoved': true
            }

            let whiteKing = {
                'type': 'king',
                'color': 'white',
                'currentPosition': 'a1',
                'hasMoved': true
            }

            board.d3.piece = blackKing
            board.d2.piece = blackPawn
            board.a1.piece = whiteKing

            let moveLogic = new MoveLogic()
            let gameMoves = []
            let color = 'white'

            expect(moveLogic.stalemate(board, gameMoves, color)).toEqual(false)
        })

        it('returns true when neither side has enough peices to win', () => {
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            Object.values(board).forEach((square) => {
                if(square.piece) {
                    board[square.piece.currentPosition].piece = null
                }
            })

            let blackKing = {
                'type': 'king',
                'color': 'black',
                'currentPosition': 'd3',
                'hasMoved': true
            }

            let blackBishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'd5',
                'hasMoved': true
            }

            let whiteKing = {
                'type': 'king',
                'color': 'white',
                'currentPosition': 'a1',
                'hasMoved': true
            }

            board.d3.piece = blackKing
            board.d5.piece = blackBishop
            board.a1.piece = whiteKing

            let moveLogic = new MoveLogic()
            let gameMoves = []
            let color = 'white'

            expect(moveLogic.stalemate(board, gameMoves, color)).toEqual(true)
        })

        it('returns false when one side has enough peices to win', () => {
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            Object.values(board).forEach((square) => {
                if(square.piece) {
                    board[square.piece.currentPosition].piece = null
                }
            })

            let blackKing = {
                'type': 'king',
                'color': 'black',
                'currentPosition': 'd3',
                'hasMoved': true
            }

            let blackBishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'd5',
                'hasMoved': true
            }

            let blackKnight = {
                'type': 'knight',
                'color': 'black',
                'currentPosition': 'h8',
                'hasMoved': true
            }

            let whiteKing = {
                'type': 'king',
                'color': 'white',
                'currentPosition': 'a1',
                'hasMoved': true
            }

            board.d3.piece = blackKing
            board.d5.piece = blackBishop
            board.a1.piece = whiteKing
            board.h8.piece = blackKnight

            let moveLogic = new MoveLogic()
            let gameMoves = []
            let color = 'white'

            expect(moveLogic.stalemate(board, gameMoves, color)).toEqual(false)
        })

        it('returns false when one side has a rook', () => {
            let board = JSON.parse(JSON.stringify(jsonChessBoard))
            Object.values(board).forEach((square) => {
                if(square.piece) {
                    board[square.piece.currentPosition].piece = null
                }
            })

            let blackKing = {
                'type': 'king',
                'color': 'black',
                'currentPosition': 'd3',
                'hasMoved': true
            }

            let blackBishop = {
                'type': 'bishop',
                'color': 'black',
                'currentPosition': 'd5',
                'hasMoved': true
            }

            let whiteRook = {
                'type': 'rook',
                'color': 'white',
                'currentPosition': 'h8',
                'hasMoved': true
            }

            let whiteKing = {
                'type': 'king',
                'color': 'white',
                'currentPosition': 'a1',
                'hasMoved': true
            }

            board.d3.piece = blackKing
            board.d5.piece = blackBishop
            board.a1.piece = whiteKing
            board.h8.piece = whiteRook

            let moveLogic = new MoveLogic()
            let gameMoves = []
            let color = 'white'

            expect(moveLogic.stalemate(board, gameMoves, color)).toEqual(false)
        })
    })

    describe('#cannotMove', () => {
        xit('test', () => {

        })
    })

    describe('#currentThreats', () => {
        xit('test', () => {

        })
    })

    describe('#insufficientPieces', () => {
        xit('test', () => {

        })
    })

    describe('#isCastle', () => {
        xit('test', () => {

        })
    })

    describe('#isEnPassant', () => {
        xit('#test', () => {

        })
    })
})
