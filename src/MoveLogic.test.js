import jsonChessBoard from './jsonChessBoard'
import MoveLogic from './helpers/MoveLogic'

describe('MoveLogic', () => {
    describe('#moveCount', () => {
        it('returns an object with the number of spaces away from the edge of the board in each direction given a position', () => {
            expect(MoveLogic.moveCount('d4').right).toEqual(4)
            expect(MoveLogic.moveCount('d4').left).toEqual(3)
            expect(MoveLogic.moveCount('d4').up).toEqual(4)
            expect(MoveLogic.moveCount('d4').down).toEqual(3)
        })
    })

    describe('#convertCoordinates', () => {
        it('converts the piece position to numeric values', () => {
            let coordinates = [4, 4]
            expect(MoveLogic.convertCoordinates('d4')).toEqual(coordinates)
        })
    })

    describe('#rightAndLeft', () => {
        it('calculates the possible moves for a piece from left to right starting at a1', () => {
            let moves = ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
            expect(MoveLogic.rightAndLeft(7, 'a', '+', 1)).toEqual(moves)

        })

        it('calculates the possible moves for a piece from right to left starting at h1', () => {
            let moves = ['g1', 'f1', 'e1', 'd1', 'c1', 'b1', 'a1']
            expect(MoveLogic.rightAndLeft(7, 'h', '-', 1)).toEqual(moves)
        })

        it('calculates the possible moves for a piece from right to left starting at d1', () => {
            let moves = ['c1', 'b1', 'a1']
            expect(MoveLogic.rightAndLeft(3, 'd', '-', 1)).toEqual(moves)
        })
    })

    describe('#upAndDown', () => {
        it('returns the squares between the start and finish of a piece from bottom to top starting at a1', () => {
            let moves = ['a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
            expect(MoveLogic.upAndDown(7, 'a', '+', 1)).toEqual(moves)
        })

        it('returns the squares between the start and finish of a piece from top to bottom starting at a8', () => {
            let moves = ['a7', 'a6', 'a5', 'a4', 'a3', 'a2', 'a1']
            expect(MoveLogic.upAndDown(7, 'a', '-', 8)).toEqual(moves)
        })

        it('returns the squares between the start and finish of a piece from bottom to top starting a3', () => {
            let moves = ['a4', 'a5', 'a6']
            expect(MoveLogic.upAndDown(3, 'a', '+', 3)).toEqual(moves)
        })
    })

    describe('#movesForRook', () => {
        it('returns an array of possible moves for a rook on an open board given a position', () => {
            let rookMoves = ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
            expect(MoveLogic.movesForRook('a1')).toEqual(rookMoves)
        })

        it('returns an array of possible moves for a rook on an open board given a different position', () => {
            let rookMoves = ['e4', 'f4', 'g4', 'h4', 'c4', 'b4', 'a4', 'd5', 'd6', 'd7', 'd8', 'd3', 'd2', 'd1']
            expect(MoveLogic.movesForRook('d4')).toEqual(rookMoves)
        })
    })

    describe('#movesForBishop', () => {
        it('returns the number of possible moves for a bishop starting at c4', () => {
            let moves = ['d5', 'e6', 'f7', 'g8', 'b5', 'a6', 'd3', 'e2', 'f1', 'b3', 'a2']
            expect(MoveLogic.movesForBishop('c4')).toEqual(moves)
        })

        it('returns the number of possible moves for a bishop starting at g2', () => {
            let moves = ['h3', 'f3', 'e4', 'd5', 'c6', 'b7', 'a8', 'h1', 'f1']
            expect(MoveLogic.movesForBishop('g2')).toEqual(moves)
        })

        it('returns the number of possible moves for a bishop starting at e7', () => {
            let moves = ['f8', 'd8', 'f6', 'g5', 'h4', 'd6', 'c5', 'b4', 'a3']
            expect(MoveLogic.movesForBishop('e7')).toEqual(moves)
        })
    })

    describe('#lesserPosition', () => {
        it('returns the lesser value', () => {
            expect(MoveLogic.lesserPosition(4, 2)).toEqual(2)
        })

        it('returns either value when they are the same', () => {
            expect(MoveLogic.lesserPosition(2, 2)).toEqual(2)
        })
    })

    describe('#diagonal', () => {
        it('returns an array of possible moves given a count, positive verticalDirection, positive horizontalDirection operator, and a column of c and a row of 4', () => {
            let moves = ['d5', 'e6', 'f7', 'g8']
            expect(MoveLogic.diagonal(4, '+', '+', 'c', 4)).toEqual(moves)
        })

        it('returns an array of possible moves given a count, positive verticalDirection, negative horizontalDirection operator, and a column of c and a row of 4', () => {
            let moves = ['b5', 'a6']
            expect(MoveLogic.diagonal(2, '+', '-', 'c', 4)).toEqual(moves)
        })

        it('returns an array of possible moves given a count, negative verticalDirection, positive horizontalDirection operator, and a column of c and a row of 4', () => {
            let moves = ['d3', 'e2', 'f1']
            expect(MoveLogic.diagonal(3, '-', '+', 'c', 4)).toEqual(moves)
        })

        it('returns an array of possible moves given a count, negative verticalDirection, negative horizontalDirection operator, and a column of c and a row of 4', () => {
            let moves = ['b3', 'a2']
            expect(MoveLogic.diagonal(2, '-', '-', 'c', 4)).toEqual(moves)
        })
    })

    describe('#validMovePath', () => {
        it('returns true if there are no pieces in the way of the two coordinates going up', () => {
            expect(MoveLogic.validMovePath('d2', 'd4', jsonChessBoard)).toEqual(true)
        })

        it('returns true if there are no pieces in the way of the two coordinates going down', () => {
            expect(MoveLogic.validMovePath('d7', 'd5', jsonChessBoard)).toEqual(true)
        })

        it('returns false if there are any pieces in the way of the two coordinates going up', () => {
            expect(MoveLogic.validMovePath('d1', 'd3', jsonChessBoard)).toEqual(false)
        })

        it('returns false if there are any pieces in the way of the two coordinates going down', () => {
            expect(MoveLogic.validMovePath('a8', 'a5', jsonChessBoard)).toEqual(false)
        })

        it('returns true for horizontal moves moving right if there are no pieces in the way of the two coordinates', () => {
            const rook = {
                'piece': {
                    'type': 'rook',
                    'color': 'black',
                    'currentPosition': 'b5'
                }
            }

            jsonChessBoard.b5 = rook
            expect(MoveLogic.validMovePath('b5', 'f5', jsonChessBoard)).toEqual(true)

            jsonChessBoard.b5.piece = null
        })

        it('returns true for horizontal moves moving left if there are no pieces in the way of the two coordinates', () => {
            const queen = {
                'type': 'queen',
                'color': 'black',
                'currentPosition': 'g5'
            }

            jsonChessBoard.g5.piece = queen
            expect(MoveLogic.validMovePath('g5', 'a5', jsonChessBoard)).toEqual(true)

            jsonChessBoard.g5.piece = null
        })

        it('returns false for horizontal moves moving left if there are any pieces in the way of the two coordinates', () => {
            const queen = {
                'piece': {
                    'type': 'queen',
                    'color': 'black',
                    'currentPosition': 'd6'
                }
            }

            const pawn = {
                'piece': {
                    'type': 'pawn',
                    'color': 'black',
                    'currentPosition': 'b6'
                }
            }

            jsonChessBoard.d6 = queen
            jsonChessBoard.b6 = pawn

            expect(MoveLogic.validMovePath('d6', 'a6', jsonChessBoard))

            jsonChessBoard.d6.piece = null
            jsonChessBoard.b6.piece = null
        })

        it('returns false for horizontal moves moving right if there are any pieces in the way of the two coordinates', () => {
            const queen = {
                'piece': {
                    'type': 'queen',
                    'color': 'black',
                    'currentPosition': 'a6'
                }
            }

            const pawn = {
                'piece': {
                    'type': 'pawn',
                    'color': 'black',
                    'currentPosition': 'c6'
                }
            }

            jsonChessBoard.a6 = queen
            jsonChessBoard.c6 = pawn

            expect(MoveLogic.validMovePath('a6', 'd6', jsonChessBoard)).toEqual(false)

            jsonChessBoard.c6.piece = null
            jsonChessBoard.a6.piece = null
        })

        it('it returns true for up right diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'c3'
                }
            }

            jsonChessBoard.c3 = bishop
            expect(MoveLogic.validMovePath('c3', 'f6', jsonChessBoard)).toEqual(true)
            jsonChessBoard.c3.piece = null
        })

        it('it returns false for up right diagonal moves when pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'f6'
                }
            }

            jsonChessBoard.f6 = bishop

            expect(MoveLogic.validMovePath('f6', 'h8', jsonChessBoard)).toEqual(false)

            jsonChessBoard.f6.piece = null
        })

        it('it returns true for down right diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'c6'
                }
            }

            jsonChessBoard.c6 = bishop

            expect(MoveLogic.validMovePath('c6', 'g2', jsonChessBoard)).toEqual(true)
            jsonChessBoard.c6.piece = null
        })

        it('it returns false for down right diagonal moves when pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'c6'
                }
            }

            jsonChessBoard.c6 = bishop

            expect(MoveLogic.validMovePath('c6', 'h1', jsonChessBoard)).toEqual(false)
            jsonChessBoard.c6.piece = null
        })

        it('it returns true for up left diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'h5'
                }
            }

            jsonChessBoard.h5 = bishop
            expect(MoveLogic.validMovePath('h5', 'f7', jsonChessBoard)).toEqual(true)

            jsonChessBoard.h5.piece = null
        })

        it('it returns false for up left diagonal moves when pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'e5'
                }
            }

            jsonChessBoard.e5 = bishop

            expect(MoveLogic.validMovePath('e5', 'b8', jsonChessBoard)).toEqual(false)

            jsonChessBoard.e5.piece = null
        })

        it('it returns true for down left diagonal moves when no pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'g4'
                }
            }

            jsonChessBoard.g4 = bishop
            expect(MoveLogic.validMovePath('g4', 'e2', jsonChessBoard)).toEqual(true)

            jsonChessBoard.g4.piece = null
        })

        it('it returns false for down left diagonal moves when pieces are in the path', () => {
            const bishop = {
                'piece': {
                    'type': 'bishop',
                    'color': 'black',
                    'currentPosition': 'g4'
                }
            }

            jsonChessBoard.g4 = bishop
            expect(MoveLogic.validMovePath('g4', 'd1', jsonChessBoard)).toEqual(false)

            jsonChessBoard.g4.piece = null
        })
    })

    describe('#validateDestination', () => {
        it('returns false if the destination is occuppied by an allied piece', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'c1'
            }
            expect(MoveLogic.validateDestination(bishop, 'd2', jsonChessBoard)).toEqual(false)
        })

        it('returns true if the destination is an enemy piece', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a6'
            }

            jsonChessBoard.a6 = bishop
            expect(MoveLogic.validateDestination(bishop, 'b7', jsonChessBoard)).toEqual(true)

            jsonChessBoard.a6.piece = null
        })

        it('returns true if the destination is an empty square', () => {
            const bishop = {
                'type': 'bishop',
                'color': 'white',
                'currentPosition': 'a6'
            }

            jsonChessBoard.a6 = bishop
            expect(MoveLogic.validateDestination(bishop, 'b5', jsonChessBoard)).toEqual(true)

            jsonChessBoard.a6.piece = null
        })
    })

    describe('#movesForQueen', () => {
        it('calculates all possible moves for a piece in every direction given a coordinate', () => {
            const queen = {
                'type': 'queen',
                'color': 'white',
                'currentPosition': 'd4'
            }

            jsonChessBoard.d4 = queen
            let moves = ['e4', 'f4', 'g4', 'h4', 'c4', 'b4', 'a4', 'd5', 'd6', 'd7', 'd8',
                'd3', 'd2', 'd1', 'e5', 'f6', 'g7', 'h8', 'c5', 'b6', 'a7', 'e3', 'f2', 'g1',
                'c3', 'b2', 'a1']
            expect(MoveLogic.movesForQueen('d4')).toEqual(moves)

            jsonChessBoard.d4.piece = null
        })
    })

    describe('#movesForKnight', () => {
        it('returns an array of all possible moves for a knight on b1', () => {
            let moves = ['d2', 'c3', 'a3']
            expect(MoveLogic.movesForKnight('b1')).toEqual(moves)
        })

        it('returns an array of all possible moves for a knight on d5', () => {
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

        })

        xit('returns false if the king is in check after the move', () => {

        })
    })
    describe('#movesForKing', () => {
        it('returns an array of all of a kings moves on an open board, given a coordinate', () => {
            let moves = ['d3', 'd5', 'e4', 'c4', 'e5', 'e3', 'c5', 'c3']
            expect(MoveLogic.movesForKing('d4')).toEqual(moves)
        })

        it('returns an array of only three moves when the king is in the corner', () => {
            let moves = ['a2', 'b1', 'b2']
            expect(MoveLogic.movesForKing('a1')).toEqual(moves)
        })

        it('returns moves for a castle if the king is on e1 or e8', () => {
            let moves = ["e2", "f1", "d1", "f2", "d2", "c1", "g1"]
            expect(MoveLogic.movesForKing('e1')).toEqual(moves)
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
            jsonChessBoard.d4.piece = pawn
            expect(MoveLogic.movesForPawn('d4', pawn, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.d4.piece = null
        })

        it('returns an array of all moves for a pawn given a d2', () => {
            let pawn = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'd2'
            }

            let moves = ['d3', 'd4']
            expect(MoveLogic.movesForPawn('d2', pawn, jsonChessBoard)).toEqual(moves)
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
            expect(MoveLogic.movesForPawn('d2', pawn, jsonChessBoard)).toEqual(moves)
        })

        it('returns an array of all moves for a pawn given a d7', () => {
            let moves = ['d6', 'd5']
            let pawn = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'd7'
            }

            expect(MoveLogic.movesForPawn('d7', pawn, jsonChessBoard)).toEqual(moves)
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
            expect(MoveLogic.movesForPawn('d2', pawn, jsonChessBoard)).toEqual(moves)
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

            jsonChessBoard.c5.piece = blackPawn
            jsonChessBoard.d4.piece = pawn

            expect(MoveLogic.movesForPawn('d4', pawn, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.c5.piece = null
            jsonChessBoard.d4.piece = null
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

            jsonChessBoard.c5.piece = whitePawn
            jsonChessBoard.d4.piece = pawn

            expect(MoveLogic.movesForPawn('d4', pawn, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.c5.piece = null
            jsonChessBoard.d4.piece = null
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

            jsonChessBoard.c5.piece = whitePawn
            jsonChessBoard.d4.piece = pawn

            expect(MoveLogic.movesForPawn('d4', pawn, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.c5.piece = null
            jsonChessBoard.d4.piece = null
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

            jsonChessBoard.e5.piece = blackPawn
            jsonChessBoard.d4.piece = pawn
            pawn.currentPosition = 'd4'

            expect(MoveLogic.movesForPawn('d4', pawn, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.e5.piece = null
            jsonChessBoard.d4.piece = null
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

            jsonChessBoard.f5.piece = blackPawn
            jsonChessBoard.e4.piece = whitePawn
            whitePawn.currentPosition = 'e4'
            blackPawn.currentPosition = 'f5'

            expect(MoveLogic.movesForPawn('f5', blackPawn, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.f5.piece = null
            jsonChessBoard.e4.piece = null
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

            jsonChessBoard.f5.piece = pawn
            jsonChessBoard.e4.piece = blackPawn
            blackPawn.currentPosition = 'e4'
            pawn.currentPosition = 'f5'

            expect(MoveLogic.movesForPawn('f5', pawn, jsonChessBoard)).toEqual(moves)

            jsonChessBoard.f5.piece = null
            jsonChessBoard.e4.piece = null
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

            jsonChessBoard.d4.piece = whitePawn
            jsonChessBoard.c5.piece = pawn

            expect(MoveLogic.movesForPawn('c5', pawn, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.d4.piece = null
            jsonChessBoard.c5.piece = null
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

            jsonChessBoard.d4.piece = whitePawn
            jsonChessBoard.c5.piece = pawn

            expect(MoveLogic.movesForPawn('c5', pawn, jsonChessBoard)).toEqual(moves)
            jsonChessBoard.d4.piece = null
            jsonChessBoard.c5.piece = null
        })

        xit('returns additional moves for en passant if applicable', () => {

        })
    })

})
