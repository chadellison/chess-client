import React from 'react'
import ReactDOM from 'react-dom'
import Square from './components/Square'
import Piece from './components/Piece'
import { shallow } from 'enzyme'

describe('Square', () => {
  describe('#piece', () => {
    it('returns a piece when one is in the square', () => {
      const div = document.createElement('div')
      const squareObject = {
        "id": "b8",
        "piece": {
          "type": "knight",
          "color": "black",
          "currentPosition": "b8",
          "possibleMoves": ["a6", "c6"]
        }
      }

      const square = shallow(<Square square={squareObject}/>, div)

      expect(square.instance().piece).toEqual(<Piece styles="glyphicon glyphicon-knight piece-black piece" />)
    })

    it('returns null when there is not a piece in the square', () => {
      const div = document.createElement('div')
      const squareObject = {
        "id": "b8",
        "piece": null
      }
      const square = shallow(<Square square={squareObject}/>, div)

      expect(square.instance().piece).toEqual(null)
    })
  })
})
