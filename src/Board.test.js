import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/Board'
import { shallow } from 'enzyme'
import jsonChessBoard from './jsonChessBoard'

describe('App', () => {
  describe('#currentSetup', () => {
    const div = document.createElement('div')
    const board = shallow(<Board chessBoard={jsonChessBoard} />, div)

    it('returns an array of 8 rows with 8 divs', () => {
      expect(board.instance().currentSetup.length).toEqual(8)
    })
  })

  describe('#boardRows', () => {
    const div = document.createElement('div')
    const board = shallow(<Board chessBoard={jsonChessBoard} />, div)

    it('returns eight arrays of eight board squares', () => {
      expect(board.instance().boardRows()[0][0].id).toEqual('a8')
    })
  })

  describe('#squareColor', () => {
    const div = document.createElement('div')
    const board = shallow(<Board chessBoard={jsonChessBoard} />, div)

    it('returns white when the coordinate passed in is an even value', () => {
      expect(board.instance().squareColor('a1')).toEqual('white')
      expect(board.instance().squareColor('d8')).toEqual('white')
      expect(board.instance().squareColor('c7')).toEqual('white')
      expect(board.instance().squareColor('e3')).toEqual('white')
    })

    it('returns black when the coordinate passed in is an odd value', () => {
      expect(board.instance().squareColor('a2')).toEqual('black')
      expect(board.instance().squareColor('d7')).toEqual('black')
      expect(board.instance().squareColor('c6')).toEqual('black')
      expect(board.instance().squareColor('e2')).toEqual('black')
    })
  })

  describe('#setOffset', () => {
    const div = document.createElement('div')
    const board = shallow(<Board chessBoard={jsonChessBoard} />, div)

    it('returns col-xs-offset-2 when the index is zero', () => {
      expect(board.instance().setOffset(0)).toEqual(' col-xs-offset-2')
    })

    it('returns an empty string when the index is not zero', () => {
      expect(board.instance().setOffset(1)).toEqual('')
    })
  })
})
