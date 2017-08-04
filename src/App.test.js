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

  it('has a chess board state', () => {
    expect(app.state().chessBoard).toEqual(jsonChessBoard)
    expect(app.state().chessBoard[0].id).toEqual('a8')
    expect(app.state().chessBoard.length).toEqual(64)
  })

  it('has null values for the pieces in the indices 16 through 47', () => {
    let blankSquares = app.state().chessBoard.slice(16, 48)
    expect(blankSquares.filter((square) => square.piece).length).toEqual(0)
  })

  it('has a black rook in the top left corner', () => {
    expect(app.state().chessBoard[0].piece.type).toEqual('rook')
    expect(app.state().chessBoard[0].piece.color).toEqual('black')
    expect(app.state().chessBoard[0].piece.currentPosition).toEqual('a8')
    expect(app.state().chessBoard[0].piece.possibleMoves).toEqual([])
  })

  it('has a black knight in the b8 position', () => {
    expect(app.state().chessBoard[1].piece.type).toEqual('knight')
    expect(app.state().chessBoard[1].piece.color).toEqual('black')
    expect(app.state().chessBoard[1].piece.currentPosition).toEqual('b8')
    expect(app.state().chessBoard[1].piece.possibleMoves).toEqual(['a6', 'c6'])
  })

  it('has a black bishop in the c8 position', () => {
    expect(app.state().chessBoard[2].piece.type).toEqual('bishop')
    expect(app.state().chessBoard[2].piece.color).toEqual('black')
    expect(app.state().chessBoard[2].piece.currentPosition).toEqual('c8')
    expect(app.state().chessBoard[2].piece.possibleMoves).toEqual([])
  })

  it('has the black queen in the d8 position', () => {
    expect(app.state().chessBoard[3].piece.type).toEqual('queen')
    expect(app.state().chessBoard[3].piece.color).toEqual('black')
    expect(app.state().chessBoard[3].piece.currentPosition).toEqual('d8')
    expect(app.state().chessBoard[3].piece.possibleMoves).toEqual([])
  })

  it('has the black king in the e8 position', () => {
    expect(app.state().chessBoard[4].piece.type).toEqual('king')
    expect(app.state().chessBoard[4].piece.color).toEqual('black')
    expect(app.state().chessBoard[4].piece.currentPosition).toEqual('e8')
    expect(app.state().chessBoard[4].piece.possibleMoves).toEqual([])
  })

  it('has a black bishop in the f8 position', () => {
    expect(app.state().chessBoard[5].piece.type).toEqual('bishop')
    expect(app.state().chessBoard[5].piece.color).toEqual('black')
    expect(app.state().chessBoard[5].piece.currentPosition).toEqual('f8')
    expect(app.state().chessBoard[5].piece.possibleMoves).toEqual([])
  })

  it('has a black knight in the g8 position', () => {
    expect(app.state().chessBoard[6].piece.type).toEqual('knight')
    expect(app.state().chessBoard[6].piece.color).toEqual('black')
    expect(app.state().chessBoard[6].piece.currentPosition).toEqual('g8')
    expect(app.state().chessBoard[6].piece.possibleMoves).toEqual(['f6', 'h6'])
  })

  it('has a black rook in the top right corner', () => {
    expect(app.state().chessBoard[7].piece.type).toEqual('rook')
    expect(app.state().chessBoard[7].piece.color).toEqual('black')
    expect(app.state().chessBoard[7].piece.currentPosition).toEqual('h8')
    expect(app.state().chessBoard[7].piece.possibleMoves).toEqual([])
  })

  it('has a black pawn in a7 position', () => {
    expect(app.state().chessBoard[8].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[8].piece.color).toEqual('black')
    expect(app.state().chessBoard[8].piece.currentPosition).toEqual('a7')
    expect(app.state().chessBoard[8].piece.possibleMoves).toEqual(['a6', 'a5'])
  })

  it('has a black pawn in b7 position', () => {
    expect(app.state().chessBoard[9].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[9].piece.color).toEqual('black')
    expect(app.state().chessBoard[9].piece.currentPosition).toEqual('b7')
    expect(app.state().chessBoard[9].piece.possibleMoves).toEqual(['b6', 'b5'])
  })

  it('has a black pawn in c7 position', () => {
    expect(app.state().chessBoard[10].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[10].piece.color).toEqual('black')
    expect(app.state().chessBoard[10].piece.currentPosition).toEqual('c7')
    expect(app.state().chessBoard[10].piece.possibleMoves).toEqual(['c6', 'c5'])
  })

  it('has a black pawn in d7 position', () => {
    expect(app.state().chessBoard[11].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[11].piece.color).toEqual('black')
    expect(app.state().chessBoard[11].piece.currentPosition).toEqual('d7')
    expect(app.state().chessBoard[11].piece.possibleMoves).toEqual(['d6', 'd5'])
  })

  it('has a black pawn in e7 position', () => {
    expect(app.state().chessBoard[12].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[12].piece.color).toEqual('black')
    expect(app.state().chessBoard[12].piece.currentPosition).toEqual('e7')
    expect(app.state().chessBoard[12].piece.possibleMoves).toEqual(['e6', 'e5'])
  })

  it('has a black pawn in f7 position', () => {
    expect(app.state().chessBoard[13].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[13].piece.color).toEqual('black')
    expect(app.state().chessBoard[13].piece.currentPosition).toEqual('f7')
    expect(app.state().chessBoard[13].piece.possibleMoves).toEqual(['f6', 'f5'])
  })

  it('has a black pawn in g7 position', () => {
    expect(app.state().chessBoard[14].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[14].piece.color).toEqual('black')
    expect(app.state().chessBoard[14].piece.currentPosition).toEqual('g7')
    expect(app.state().chessBoard[14].piece.possibleMoves).toEqual(['g6', 'g5'])
  })

  it('has a black pawn in h7 position', () => {
    expect(app.state().chessBoard[15].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[15].piece.color).toEqual('black')
    expect(app.state().chessBoard[15].piece.currentPosition).toEqual('h7')
    expect(app.state().chessBoard[15].piece.possibleMoves).toEqual(['h6', 'h5'])
  })

  it('has a white pawn in a2 position', () => {
    expect(app.state().chessBoard[48].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[48].piece.color).toEqual('white')
    expect(app.state().chessBoard[48].piece.currentPosition).toEqual('a2')
    expect(app.state().chessBoard[48].piece.possibleMoves).toEqual(['a3', 'a4'])
  })

  it('has a white pawn in b2 position', () => {
    expect(app.state().chessBoard[49].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[49].piece.color).toEqual('white')
    expect(app.state().chessBoard[49].piece.currentPosition).toEqual('b2')
    expect(app.state().chessBoard[49].piece.possibleMoves).toEqual(['b3', 'b4'])
  })

  it('has a white pawn in c2 position', () => {
    expect(app.state().chessBoard[50].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[50].piece.color).toEqual('white')
    expect(app.state().chessBoard[50].piece.currentPosition).toEqual('c2')
    expect(app.state().chessBoard[50].piece.possibleMoves).toEqual(['c3', 'c4'])
  })

  it('has a white pawn in d2 position', () => {
    expect(app.state().chessBoard[51].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[51].piece.color).toEqual('white')
    expect(app.state().chessBoard[51].piece.currentPosition).toEqual('d2')
    expect(app.state().chessBoard[51].piece.possibleMoves).toEqual(['d3', 'd4'])
  })

  it('has a white pawn in e2 position', () => {
    expect(app.state().chessBoard[52].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[52].piece.color).toEqual('white')
    expect(app.state().chessBoard[52].piece.currentPosition).toEqual('e2')
    expect(app.state().chessBoard[52].piece.possibleMoves).toEqual(['e3', 'e4'])
  })

  it('has a white pawn in f2 position', () => {
    expect(app.state().chessBoard[53].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[53].piece.color).toEqual('white')
    expect(app.state().chessBoard[53].piece.currentPosition).toEqual('f2')
    expect(app.state().chessBoard[53].piece.possibleMoves).toEqual(['f3', 'f4'])
  })

  it('has a white pawn in g2 position', () => {
    expect(app.state().chessBoard[54].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[54].piece.color).toEqual('white')
    expect(app.state().chessBoard[54].piece.currentPosition).toEqual('g2')
    expect(app.state().chessBoard[54].piece.possibleMoves).toEqual(['g3', 'g4'])
  })

  it('has a white pawn in h2 position', () => {
    expect(app.state().chessBoard[55].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[55].piece.color).toEqual('white')
    expect(app.state().chessBoard[55].piece.currentPosition).toEqual('h2')
    expect(app.state().chessBoard[55].piece.possibleMoves).toEqual(['h3', 'h4'])
  })

  it('has a white rook in the bottom left corner', () => {
    expect(app.state().chessBoard[56].piece.type).toEqual('rook')
    expect(app.state().chessBoard[56].piece.color).toEqual('white')
    expect(app.state().chessBoard[56].piece.currentPosition).toEqual('a1')
    expect(app.state().chessBoard[56].piece.possibleMoves).toEqual([])
  })

  it('has a white knight in the b1 position', () => {
    expect(app.state().chessBoard[57].piece.type).toEqual('knight')
    expect(app.state().chessBoard[57].piece.color).toEqual('white')
    expect(app.state().chessBoard[57].piece.currentPosition).toEqual('b1')
    expect(app.state().chessBoard[57].piece.possibleMoves).toEqual(['a3', 'c3'])
  })

  it('has a white bishop in the c1 position', () => {
    expect(app.state().chessBoard[58].piece.type).toEqual('bishop')
    expect(app.state().chessBoard[58].piece.color).toEqual('white')
    expect(app.state().chessBoard[58].piece.currentPosition).toEqual('c1')
    expect(app.state().chessBoard[58].piece.possibleMoves).toEqual([])
  })

  it('has the white queen in the d1 position', () => {
    expect(app.state().chessBoard[59].piece.type).toEqual('queen')
    expect(app.state().chessBoard[59].piece.color).toEqual('white')
    expect(app.state().chessBoard[59].piece.currentPosition).toEqual('d1')
    expect(app.state().chessBoard[59].piece.possibleMoves).toEqual([])
  })

  it('has the white king in the e1 position', () => {
    expect(app.state().chessBoard[60].piece.type).toEqual('king')
    expect(app.state().chessBoard[60].piece.color).toEqual('white')
    expect(app.state().chessBoard[60].piece.currentPosition).toEqual('e1')
    expect(app.state().chessBoard[60].piece.possibleMoves).toEqual([])
  })

  it('has a white bishop in the f1 position', () => {
    expect(app.state().chessBoard[61].piece.type).toEqual('bishop')
    expect(app.state().chessBoard[61].piece.color).toEqual('white')
    expect(app.state().chessBoard[61].piece.currentPosition).toEqual('f1')
    expect(app.state().chessBoard[61].piece.possibleMoves).toEqual([])
  })

  it('has a white knight in the g1 position', () => {
    expect(app.state().chessBoard[62].piece.type).toEqual('knight')
    expect(app.state().chessBoard[62].piece.color).toEqual('white')
    expect(app.state().chessBoard[62].piece.currentPosition).toEqual('g1')
    expect(app.state().chessBoard[62].piece.possibleMoves).toEqual(['f3', 'h3'])
  })

  it('has a white rook in the h1 position', () => {
    expect(app.state().chessBoard[63].piece.type).toEqual('rook')
    expect(app.state().chessBoard[63].piece.color).toEqual('white')
    expect(app.state().chessBoard[63].piece.currentPosition).toEqual('h1')
    expect(app.state().chessBoard[63].piece.possibleMoves).toEqual([])
  })
})
