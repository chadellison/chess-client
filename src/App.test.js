import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'
import jsonChessBoard from './jsonChessBoard'

describe('App', () => {
  const div = document.createElement('div')
  const app = shallow(<App />, div)

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div)
  })

  it('has a chess board state with 64 positions', () => {
    expect(app.state().chessBoard).toEqual(jsonChessBoard)
    expect(Object.keys(app.state().chessBoard).length).toEqual(64)
  })

  it('has null values for the pieces in the indices 16 through 47', () => {
    let blankSquares = Object.values(app.state().chessBoard).slice(16, 48)
    expect(blankSquares.filter((square) => square.piece).length).toEqual(0)
  })

  it('has a black rook in the top left corner', () => {
    expect(app.state().chessBoard.a8.piece.type).toEqual('rook')
    expect(app.state().chessBoard.a8.piece.color).toEqual('black')
    expect(app.state().chessBoard.a8.piece.currentPosition).toEqual('a8')
    expect(app.state().chessBoard.a8.piece.possibleMoves).toEqual([])
  })

  it('has a black knight in the b8 position', () => {
    expect(app.state().chessBoard.b8.piece.type).toEqual('knight')
    expect(app.state().chessBoard.b8.piece.color).toEqual('black')
    expect(app.state().chessBoard.b8.piece.currentPosition).toEqual('b8')
    expect(app.state().chessBoard.b8.piece.possibleMoves).toEqual(['a6', 'c6'])
  })

  it('has a black bishop in the c8 position', () => {
    expect(app.state().chessBoard.c8.piece.type).toEqual('bishop')
    expect(app.state().chessBoard.c8.piece.color).toEqual('black')
    expect(app.state().chessBoard.c8.piece.currentPosition).toEqual('c8')
    expect(app.state().chessBoard.c8.piece.possibleMoves).toEqual([])
  })

  it('has the black queen in the d8 position', () => {
    expect(app.state().chessBoard.d8.piece.type).toEqual('queen')
    expect(app.state().chessBoard.d8.piece.color).toEqual('black')
    expect(app.state().chessBoard.d8.piece.currentPosition).toEqual('d8')
    expect(app.state().chessBoard.d8.piece.possibleMoves).toEqual([])
  })

  it('has the black king in the e8 position', () => {
    expect(app.state().chessBoard.e8.piece.type).toEqual('king')
    expect(app.state().chessBoard.e8.piece.color).toEqual('black')
    expect(app.state().chessBoard.e8.piece.currentPosition).toEqual('e8')
    expect(app.state().chessBoard.e8.piece.possibleMoves).toEqual([])
  })

  it('has a black bishop in the f8 position', () => {
    expect(app.state().chessBoard.f8.piece.type).toEqual('bishop')
    expect(app.state().chessBoard.f8.piece.color).toEqual('black')
    expect(app.state().chessBoard.f8.piece.currentPosition).toEqual('f8')
    expect(app.state().chessBoard.f8.piece.possibleMoves).toEqual([])
  })

  it('has a black knight in the g8 position', () => {
    expect(app.state().chessBoard.g8.piece.type).toEqual('knight')
    expect(app.state().chessBoard.g8.piece.color).toEqual('black')
    expect(app.state().chessBoard.g8.piece.currentPosition).toEqual('g8')
    expect(app.state().chessBoard.g8.piece.possibleMoves).toEqual(['f6', 'h6'])
  })

  it('has a black rook in the top right corner', () => {
    expect(app.state().chessBoard.h8.piece.type).toEqual('rook')
    expect(app.state().chessBoard.h8.piece.color).toEqual('black')
    expect(app.state().chessBoard.h8.piece.currentPosition).toEqual('h8')
    expect(app.state().chessBoard.h8.piece.possibleMoves).toEqual([])
  })

  it('has a black pawn in a7 position', () => {
    expect(app.state().chessBoard.a7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.a7.piece.color).toEqual('black')
    expect(app.state().chessBoard.a7.piece.currentPosition).toEqual('a7')
    expect(app.state().chessBoard.a7.piece.possibleMoves).toEqual(['a6', 'a5'])
  })

  it('has a black pawn in b7 position', () => {
    expect(app.state().chessBoard.b7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.b7.piece.color).toEqual('black')
    expect(app.state().chessBoard.b7.piece.currentPosition).toEqual('b7')
    expect(app.state().chessBoard.b7.piece.possibleMoves).toEqual(['b6', 'b5'])
  })

  it('has a black pawn in c7 position', () => {
    expect(app.state().chessBoard.c7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.c7.piece.color).toEqual('black')
    expect(app.state().chessBoard.c7.piece.currentPosition).toEqual('c7')
    expect(app.state().chessBoard.c7.piece.possibleMoves).toEqual(['c6', 'c5'])
  })

  it('has a black pawn in d7 position', () => {
    expect(app.state().chessBoard.d7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.d7.piece.color).toEqual('black')
    expect(app.state().chessBoard.d7.piece.currentPosition).toEqual('d7')
    expect(app.state().chessBoard.d7.piece.possibleMoves).toEqual(['d6', 'd5'])
  })

  it('has a black pawn in e7 position', () => {
    expect(app.state().chessBoard.e7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.e7.piece.color).toEqual('black')
    expect(app.state().chessBoard.e7.piece.currentPosition).toEqual('e7')
    expect(app.state().chessBoard.e7.piece.possibleMoves).toEqual(['e6', 'e5'])
  })

  it('has a black pawn in f7 position', () => {
    expect(app.state().chessBoard.f7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.f7.piece.color).toEqual('black')
    expect(app.state().chessBoard.f7.piece.currentPosition).toEqual('f7')
    expect(app.state().chessBoard.f7.piece.possibleMoves).toEqual(['f6', 'f5'])
  })

  it('has a black pawn in g7 position', () => {
    expect(app.state().chessBoard.g7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.g7.piece.color).toEqual('black')
    expect(app.state().chessBoard.g7.piece.currentPosition).toEqual('g7')
    expect(app.state().chessBoard.g7.piece.possibleMoves).toEqual(['g6', 'g5'])
  })

  it('has a black pawn in h7 position', () => {
    expect(app.state().chessBoard.h7.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.h7.piece.color).toEqual('black')
    expect(app.state().chessBoard.h7.piece.currentPosition).toEqual('h7')
    expect(app.state().chessBoard.h7.piece.possibleMoves).toEqual(['h6', 'h5'])
  })

  it('has a white pawn in a2 position', () => {
    expect(app.state().chessBoard.a2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.a2.piece.color).toEqual('white')
    expect(app.state().chessBoard.a2.piece.currentPosition).toEqual('a2')
    expect(app.state().chessBoard.a2.piece.possibleMoves).toEqual(['a3', 'a4'])
  })

  it('has a white pawn in b2 position', () => {
    expect(app.state().chessBoard.b2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.b2.piece.color).toEqual('white')
    expect(app.state().chessBoard.b2.piece.currentPosition).toEqual('b2')
    expect(app.state().chessBoard.b2.piece.possibleMoves).toEqual(['b3', 'b4'])
  })

  it('has a white pawn in c2 position', () => {
    expect(app.state().chessBoard.c2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.c2.piece.color).toEqual('white')
    expect(app.state().chessBoard.c2.piece.currentPosition).toEqual('c2')
    expect(app.state().chessBoard.c2.piece.possibleMoves).toEqual(['c3', 'c4'])
  })

  it('has a white pawn in d2 position', () => {
    expect(app.state().chessBoard.d2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.d2.piece.color).toEqual('white')
    expect(app.state().chessBoard.d2.piece.currentPosition).toEqual('d2')
    expect(app.state().chessBoard.d2.piece.possibleMoves).toEqual(['d3', 'd4'])
  })

  it('has a white pawn in e2 position', () => {
    expect(app.state().chessBoard.e2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.e2.piece.color).toEqual('white')
    expect(app.state().chessBoard.e2.piece.currentPosition).toEqual('e2')
    expect(app.state().chessBoard.e2.piece.possibleMoves).toEqual(['e3', 'e4'])
  })

  it('has a white pawn in f2 position', () => {
    expect(app.state().chessBoard.f2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.f2.piece.color).toEqual('white')
    expect(app.state().chessBoard.f2.piece.currentPosition).toEqual('f2')
    expect(app.state().chessBoard.f2.piece.possibleMoves).toEqual(['f3', 'f4'])
  })

  it('has a white pawn in g2 position', () => {
    expect(app.state().chessBoard.g2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.g2.piece.color).toEqual('white')
    expect(app.state().chessBoard.g2.piece.currentPosition).toEqual('g2')
    expect(app.state().chessBoard.g2.piece.possibleMoves).toEqual(['g3', 'g4'])
  })

  it('has a white pawn in h2 position', () => {
    expect(app.state().chessBoard.h2.piece.type).toEqual('pawn')
    expect(app.state().chessBoard.h2.piece.color).toEqual('white')
    expect(app.state().chessBoard.h2.piece.currentPosition).toEqual('h2')
    expect(app.state().chessBoard.h2.piece.possibleMoves).toEqual(['h3', 'h4'])
  })

  it('has a white rook in the bottom left corner', () => {
    expect(app.state().chessBoard.a1.piece.type).toEqual('rook')
    expect(app.state().chessBoard.a1.piece.color).toEqual('white')
    expect(app.state().chessBoard.a1.piece.currentPosition).toEqual('a1')
    expect(app.state().chessBoard.a1.piece.possibleMoves).toEqual([])
  })

  it('has a white knight in the b1 position', () => {
    expect(app.state().chessBoard.b1.piece.type).toEqual('knight')
    expect(app.state().chessBoard.b1.piece.color).toEqual('white')
    expect(app.state().chessBoard.b1.piece.currentPosition).toEqual('b1')
    expect(app.state().chessBoard.b1.piece.possibleMoves).toEqual(['a3', 'c3'])
  })

  it('has a white bishop in the c1 position', () => {
    expect(app.state().chessBoard.c1.piece.type).toEqual('bishop')
    expect(app.state().chessBoard.c1.piece.color).toEqual('white')
    expect(app.state().chessBoard.c1.piece.currentPosition).toEqual('c1')
    expect(app.state().chessBoard.c1.piece.possibleMoves).toEqual([])
  })

  it('has the white queen in the d1 position', () => {
    expect(app.state().chessBoard.d1.piece.type).toEqual('queen')
    expect(app.state().chessBoard.d1.piece.color).toEqual('white')
    expect(app.state().chessBoard.d1.piece.currentPosition).toEqual('d1')
    expect(app.state().chessBoard.d1.piece.possibleMoves).toEqual([])
  })

  it('has the white king in the e1 position', () => {
    expect(app.state().chessBoard.e1.piece.type).toEqual('king')
    expect(app.state().chessBoard.e1.piece.color).toEqual('white')
    expect(app.state().chessBoard.e1.piece.currentPosition).toEqual('e1')
    expect(app.state().chessBoard.e1.piece.possibleMoves).toEqual([])
  })

  it('has a white bishop in the f1 position', () => {
    expect(app.state().chessBoard.f1.piece.type).toEqual('bishop')
    expect(app.state().chessBoard.f1.piece.color).toEqual('white')
    expect(app.state().chessBoard.f1.piece.currentPosition).toEqual('f1')
    expect(app.state().chessBoard.f1.piece.possibleMoves).toEqual([])
  })

  it('has a white knight in the g1 position', () => {
    expect(app.state().chessBoard.g1.piece.type).toEqual('knight')
    expect(app.state().chessBoard.g1.piece.color).toEqual('white')
    expect(app.state().chessBoard.g1.piece.currentPosition).toEqual('g1')
    expect(app.state().chessBoard.g1.piece.possibleMoves).toEqual(['f3', 'h3'])
  })

  it('has a white rook in the h1 position', () => {
    expect(app.state().chessBoard.h1.piece.type).toEqual('rook')
    expect(app.state().chessBoard.h1.piece.color).toEqual('white')
    expect(app.state().chessBoard.h1.piece.currentPosition).toEqual('h1')
    expect(app.state().chessBoard.h1.piece.possibleMoves).toEqual([])
  })

  it('has a selected state', () => {
    expect(app.state().selected).toEqual(null)
    const pawn = app.state().chessBoard.a7.piece
    app.state().selected = pawn
    expect(app.state().selected).toEqual(pawn)
  })

  describe('#move', () => {
    const div = document.createElement('div')
    const app = shallow(<App />, div)

    it('can move to a different square', () => {
      const pawn = app.state().chessBoard.a7.piece
      app.state().selected = pawn
      app.instance().move('a6')
      expect(pawn.currentPosition).toEqual('a6')
      expect(app.state().chessBoard.a6.piece).toEqual(pawn)
      expect(app.state().chessBoard.a7.piece).toEqual(null)

      app.state().chessBoard.a6.piece = null
      app.state().chessBoard.a7.piece = {
        'piece': {
          'type': 'pawn',
          'color': 'black',
          'currentPosition': 'a7',
          'possibleMoves': ['a6', 'a5']
        }
      }
    })
  })

  describe('#handleSelected', () => {
    const div = document.createElement('div')
    const app = shallow(<App />, div)

    beforeEach(() => {
      app.state().selected = null
    })

    it('sets the state of selected to the selected object', () => {
      app.instance().handleSelected('e1')
      expect(app.state().selected).toEqual(app.state().chessBoard.e1.piece)
    })

    it('maintains the state of the current selected object when another object is clicked', () => {
      app.instance().handleSelected('e1')
      app.instance().handleSelected('d1')
      expect(app.state().selected).toEqual(app.state().chessBoard.e1.piece)
    })

    it('unselects the current object if it is clicked a second time', () => {
      app.instance().handleSelected('e1')
      app.instance().handleSelected('e1')
      expect(app.state().selected).toEqual(null)
    })
  })

  describe('#movesForRook', () => {
    const div = document.createElement('div')
    const app = shallow(<App />, div)

    beforeEach(() => {
      app.state().selected = null
    })

    it('returns an array of possible moves for a rook on an open board given a position', () => {
      let rookMoves = ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
      expect(app.instance().movesForRook('a1')).toEqual(rookMoves)
    })

    it('returns an array of possible moves for a rook on an open board given a different position', () => {
      let rookMoves = ['e4', 'f4', 'g4', 'h4', 'c4', 'b4', 'a4', 'd5', 'd6', 'd7', 'd8', 'd3', 'd2', 'd1']
      expect(app.instance().movesForRook('d4')).toEqual(rookMoves)
    })

  })

  describe('#upAndDown', () => {
    xit('calculates the possible moves for a piece from top to bottom', () => {

    })
  })

  describe('#rightAndLeft', () => {
    xit('calculates the possible moves for a piece from left to right', () => {

    })
  })

  describe('#validMovePath', () => {
    beforeEach(() => {
      app.state().selected = null
    })

    it('returns true if there are no pieces in the way of the two coordinates going up', () => {
      app.instance().handleSelected('d2')
      expect(app.instance().validMovePath('d4')).toEqual(true)
    })

    it('returns true if there are no pieces in the way of the two coordinates going down', () => {
      app.instance().handleSelected('d7')
      expect(app.instance().validMovePath('d5')).toEqual(true)
    })

    it('returns false if there are any pieces in the way of the two coordinates going up', () => {
      app.instance().handleSelected('d1')
      expect(app.instance().validMovePath('d3')).toEqual(false)
    })

    it('returns false if there are any pieces in the way of the two coordinates going down', () => {
      app.instance().handleSelected('a8')
      expect(app.instance().validMovePath('a5')).toEqual(false)
    })

    it('returns true for horizontal moves moving right if there are no pieces in the way of the two coordinates', () => {
      const rook = {
        'piece': {
          'type': 'rook',
          'color': 'black',
          'currentPosition': 'b5'
        }
      }

      app.state().chessBoard.b5 = rook
      app.instance().handleSelected('b5')
      expect(app.instance().validMovePath('f5')).toEqual(true)

      app.state().chessBoard.b5.piece = null
    })

    it('returns true for horizontal moves moving left if there are no pieces in the way of the two coordinates', () => {
      const queen = {
        'piece': {
          'type': 'queen',
          'color': 'black',
          'currentPosition': 'g5'
        }
      }

      app.state().chessBoard.g5 = queen
      app.instance().handleSelected('g5')
      expect(app.instance().validMovePath('a5')).toEqual(true)

      app.state().chessBoard.g5.piece = null
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

      app.state().chessBoard.d6 = queen
      app.state().chessBoard.b6 = pawn
      app.instance().handleSelected('d6')

      expect(app.instance().validMovePath('a6'))

      app.state().chessBoard.d6.piece = null
      app.state().chessBoard.b6.piece = null
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

      app.state().chessBoard.a6 = queen
      app.state().chessBoard.c6 = pawn
      app.instance().handleSelected('a6')

      expect(app.instance().validMovePath('d6')).toEqual(false)

      app.state().chessBoard.c6.piece = null
      app.state().chessBoard.a6.piece = null
    })

    xit('it returns true for up right diagonal moves when no pieces are in the path', () => {

    })

    xit('it returns false for up right diagonal moves when pieces are in the path', () => {

    })

    xit('it returns true for down right diagonal moves when no pieces are in the path', () => {

    })

    xit('it returns false for down right diagonal moves when pieces are in the path', () => {

    })

    xit('it returns true for up left diagonal moves when no pieces are in the path', () => {

    })

    xit('it returns false for up left diagonal moves when pieces are in the path', () => {

    })

    xit('it returns true for down left diagonal moves when no pieces are in the path', () => {

    })

    xit('it returns false for down left diagonal moves when pieces are in the path', () => {

    })
  })

  describe('#validDestination', () => {
    xit('returns false if the destination is occuppied by an allied piece', () => {

    })

    xit('returns true if the destination is not occuppied by an allied piece', () => {

    })
  })

  describe('#kingIsSafe', () => {
    xit('returns true if the king is not in check after the move', () => {

    })

    xit('returns false if the king is in check after the move', () => {

    })
  })
})
