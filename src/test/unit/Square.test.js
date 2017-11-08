import React from 'react'
import ReactDOM from 'react-dom'
import Square from '../../components/Square'
import Piece from '../../components/Piece'
import { shallow } from 'enzyme'

describe('Square', () => {
  describe('#piece', () => {
    xit('returns a piece when one is on the square', () => {
      const div = document.createElement('div')
      const pieceObject = {
        "type": "knight",
        "color": "black",
        "currentPosition": "b8",
        "possibleMoves": ["a6", "c6"]
      }

      const square = shallow(<Square piece={pieceObject}/>, div)

      expect(square.instance().piece).toEqual(<Piece piece={pieceObject}/>)
    })

    xit('returns null when there is not a piece in the square', () => {
      const div = document.createElement('div')
      const pieceObject = null
      const square = shallow(<Square piece={pieceObject}/>, div)

      expect(square.instance().piece).toEqual(null)
    })
  })

  describe('#handleMove', () => {
    xit('returns the move function when a piece is selected', () => {

    })

    xit('returns null when a piece is not selected', () => {

    })
  })

  describe('#availableMove', () => {
    xit('test', () => {

    })

    xit('test', () => {

    })
  })
})
