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
    ReactDOM.render(<App />, div);
  })

  it('has a chess board state', () => {
    expect(app.state().chessBoard).toEqual(jsonChessBoard)
    expect(app.state().chessBoard[0].id).toEqual('a8')
    expect(app.state().chessBoard.length).toEqual(64)
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
    expect(app.state().chessBoard[1].piece.possibleMoves).toEqual(["a6", "c6"])
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
    expect(app.state().chessBoard[6].piece.possibleMoves).toEqual(["f6", "h6"])
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
    expect(app.state().chessBoard[8].piece.possibleMoves).toEqual(["a6", "a5"])
  })

  it('has a black pawn in b7 position', () => {
    expect(app.state().chessBoard[9].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[9].piece.color).toEqual('black')
    expect(app.state().chessBoard[9].piece.currentPosition).toEqual('b7')
    expect(app.state().chessBoard[9].piece.possibleMoves).toEqual(["b6", "b5"])
  })

  it('has a black pawn in c7 position', () => {
    expect(app.state().chessBoard[10].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[10].piece.color).toEqual('black')
    expect(app.state().chessBoard[10].piece.currentPosition).toEqual('c7')
    expect(app.state().chessBoard[10].piece.possibleMoves).toEqual(["c6", "c5"])
  })

  it('has a black pawn in d7 position', () => {
    expect(app.state().chessBoard[11].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[11].piece.color).toEqual('black')
    expect(app.state().chessBoard[11].piece.currentPosition).toEqual('d7')
    expect(app.state().chessBoard[11].piece.possibleMoves).toEqual(["d6", "d5"])
  })

  it('has a black pawn in e7 position', () => {
    expect(app.state().chessBoard[12].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[12].piece.color).toEqual('black')
    expect(app.state().chessBoard[12].piece.currentPosition).toEqual('e7')
    expect(app.state().chessBoard[12].piece.possibleMoves).toEqual(["e6", "e5"])
  })

  it('has a black pawn in f7 position', () => {
    expect(app.state().chessBoard[13].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[13].piece.color).toEqual('black')
    expect(app.state().chessBoard[13].piece.currentPosition).toEqual('f7')
    expect(app.state().chessBoard[13].piece.possibleMoves).toEqual(["f6", "f5"])
  })

  it('has a black pawn in g7 position', () => {
    expect(app.state().chessBoard[14].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[14].piece.color).toEqual('black')
    expect(app.state().chessBoard[14].piece.currentPosition).toEqual('g7')
    expect(app.state().chessBoard[14].piece.possibleMoves).toEqual(["g6", "g5"])
  })

  it('has a black pawn in h7 position', () => {
    expect(app.state().chessBoard[15].piece.type).toEqual('pawn')
    expect(app.state().chessBoard[15].piece.color).toEqual('black')
    expect(app.state().chessBoard[15].piece.currentPosition).toEqual('h7')
    expect(app.state().chessBoard[15].piece.possibleMoves).toEqual(["h6", "h5"])
  })

  xit('has a white rook in the bottom left corner', () => {
    expect(app.state().chessBoard[56].piece.type).toEqual('rook')
    expect(app.state().chessBoard[56].piece.color).toEqual('white')
    expect(app.state().chessBoard[56].piece.currentPosition).toEqual('a1')
    expect(app.state().chessBoard[56].piece.possibleMoves).toEqual([])
  })
})
