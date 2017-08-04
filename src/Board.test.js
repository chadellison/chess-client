import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/Board'
import { shallow } from 'enzyme'
import jsonChessBoard from './jsonChessBoard'

describe('App', () => {
  describe('#currentSetup', () => {
    const div = document.createElement('div')
    const board = shallow(<Board chessBoard={jsonChessBoard} />, div)

    it('returns an two dimensional array of 8 rows with 8 divs', () => {
      expect(board.instance().currentSetup.length).toEqual(8)
    })
  })
})
