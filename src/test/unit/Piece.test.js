import React from 'react'
import ReactDOM from 'react-dom'
import Piece from '../../components/Piece'
import { shallow } from 'enzyme'

describe('Piece', () => {
  describe('#selected', () => {
    xit('returns selected when the current piece is the selected peice', () => {
      const pieceObject = {
        "type": "knight",
        "color": "black",
        "currentPosition": "b8",
        "possibleMoves": ["a6", "c6"]
      }

      const i = document.createElement('i')
      const piece = shallow(<Piece piece={pieceObject} isSelected={pieceObject} />, i)

      expect(piece.instance().selected).toEqual('selected')
    })

    xit('returns an empty string when the current piece is not the selected piece', () => {
      const pieceObject = {
        "type": "knight",
        "color": "black",
        "currentPosition": "b8",
        "possibleMoves": ["a6", "c6"]
      }

      const i = document.createElement('i')
      const piece = shallow(<Piece piece={pieceObject} isSelected={null} />, i)
      expect(piece.instance().selected).toEqual('')
    })
  })
})
