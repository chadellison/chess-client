import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme'
import jsonChessBoard from './jsonChessBoard'

describe('App', () => {
    const div = document.createElement('div')
    const app = shallow(<App />, div)

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div)
    })

    it('has a moves state that begins with an empty array', () => {
      expect(app.state().moves).toEqual([])
    })

    it('has a turn state that begins as an empty string', () => {
      expect(app.state().turn).toEqual('white')
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
    })

    it('has a black knight in the b8 position', () => {
        expect(app.state().chessBoard.b8.piece.type).toEqual('knight')
        expect(app.state().chessBoard.b8.piece.color).toEqual('black')
        expect(app.state().chessBoard.b8.piece.currentPosition).toEqual('b8')
    })

    it('has a black bishop in the c8 position', () => {
        expect(app.state().chessBoard.c8.piece.type).toEqual('bishop')
        expect(app.state().chessBoard.c8.piece.color).toEqual('black')
        expect(app.state().chessBoard.c8.piece.currentPosition).toEqual('c8')
    })

    it('has the black queen in the d8 position', () => {
        expect(app.state().chessBoard.d8.piece.type).toEqual('queen')
        expect(app.state().chessBoard.d8.piece.color).toEqual('black')
        expect(app.state().chessBoard.d8.piece.currentPosition).toEqual('d8')
    })

    it('has the black king in the e8 position', () => {
        expect(app.state().chessBoard.e8.piece.type).toEqual('king')
        expect(app.state().chessBoard.e8.piece.color).toEqual('black')
        expect(app.state().chessBoard.e8.piece.currentPosition).toEqual('e8')
    })

    it('has a black bishop in the f8 position', () => {
        expect(app.state().chessBoard.f8.piece.type).toEqual('bishop')
        expect(app.state().chessBoard.f8.piece.color).toEqual('black')
        expect(app.state().chessBoard.f8.piece.currentPosition).toEqual('f8')
    })

    it('has a black knight in the g8 position', () => {
        expect(app.state().chessBoard.g8.piece.type).toEqual('knight')
        expect(app.state().chessBoard.g8.piece.color).toEqual('black')
        expect(app.state().chessBoard.g8.piece.currentPosition).toEqual('g8')
    })

    it('has a black rook in the top right corner', () => {
        expect(app.state().chessBoard.h8.piece.type).toEqual('rook')
        expect(app.state().chessBoard.h8.piece.color).toEqual('black')
        expect(app.state().chessBoard.h8.piece.currentPosition).toEqual('h8')
    })

    it('has a black pawn in a7 position', () => {
        expect(app.state().chessBoard.a7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.a7.piece.color).toEqual('black')
        expect(app.state().chessBoard.a7.piece.currentPosition).toEqual('a7')
    })

    it('has a black pawn in b7 position', () => {
        expect(app.state().chessBoard.b7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.b7.piece.color).toEqual('black')
        expect(app.state().chessBoard.b7.piece.currentPosition).toEqual('b7')
    })

    it('has a black pawn in c7 position', () => {
        expect(app.state().chessBoard.c7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.c7.piece.color).toEqual('black')
        expect(app.state().chessBoard.c7.piece.currentPosition).toEqual('c7')
    })

    it('has a black pawn in d7 position', () => {
        expect(app.state().chessBoard.d7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.d7.piece.color).toEqual('black')
        expect(app.state().chessBoard.d7.piece.currentPosition).toEqual('d7')
    })

    it('has a black pawn in e7 position', () => {
        expect(app.state().chessBoard.e7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.e7.piece.color).toEqual('black')
        expect(app.state().chessBoard.e7.piece.currentPosition).toEqual('e7')
    })

    it('has a black pawn in f7 position', () => {
        expect(app.state().chessBoard.f7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.f7.piece.color).toEqual('black')
        expect(app.state().chessBoard.f7.piece.currentPosition).toEqual('f7')
    })

    it('has a black pawn in g7 position', () => {
        expect(app.state().chessBoard.g7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.g7.piece.color).toEqual('black')
        expect(app.state().chessBoard.g7.piece.currentPosition).toEqual('g7')
    })

    it('has a black pawn in h7 position', () => {
        expect(app.state().chessBoard.h7.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.h7.piece.color).toEqual('black')
        expect(app.state().chessBoard.h7.piece.currentPosition).toEqual('h7')
    })

    it('has a white pawn in a2 position', () => {
        expect(app.state().chessBoard.a2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.a2.piece.color).toEqual('white')
        expect(app.state().chessBoard.a2.piece.currentPosition).toEqual('a2')
    })

    it('has a white pawn in b2 position', () => {
        expect(app.state().chessBoard.b2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.b2.piece.color).toEqual('white')
        expect(app.state().chessBoard.b2.piece.currentPosition).toEqual('b2')
    })

    it('has a white pawn in c2 position', () => {
        expect(app.state().chessBoard.c2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.c2.piece.color).toEqual('white')
        expect(app.state().chessBoard.c2.piece.currentPosition).toEqual('c2')
    })

    it('has a white pawn in d2 position', () => {
        expect(app.state().chessBoard.d2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.d2.piece.color).toEqual('white')
        expect(app.state().chessBoard.d2.piece.currentPosition).toEqual('d2')
    })

    it('has a white pawn in e2 position', () => {
        expect(app.state().chessBoard.e2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.e2.piece.color).toEqual('white')
        expect(app.state().chessBoard.e2.piece.currentPosition).toEqual('e2')
    })

    it('has a white pawn in f2 position', () => {
        expect(app.state().chessBoard.f2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.f2.piece.color).toEqual('white')
        expect(app.state().chessBoard.f2.piece.currentPosition).toEqual('f2')
    })

    it('has a white pawn in g2 position', () => {
        expect(app.state().chessBoard.g2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.g2.piece.color).toEqual('white')
        expect(app.state().chessBoard.g2.piece.currentPosition).toEqual('g2')
    })

    it('has a white pawn in h2 position', () => {
        expect(app.state().chessBoard.h2.piece.type).toEqual('pawn')
        expect(app.state().chessBoard.h2.piece.color).toEqual('white')
        expect(app.state().chessBoard.h2.piece.currentPosition).toEqual('h2')
    })

    it('has a white rook in the bottom left corner', () => {
        expect(app.state().chessBoard.a1.piece.type).toEqual('rook')
        expect(app.state().chessBoard.a1.piece.color).toEqual('white')
        expect(app.state().chessBoard.a1.piece.currentPosition).toEqual('a1')
    })

    it('has a white knight in the b1 position', () => {
        expect(app.state().chessBoard.b1.piece.type).toEqual('knight')
        expect(app.state().chessBoard.b1.piece.color).toEqual('white')
        expect(app.state().chessBoard.b1.piece.currentPosition).toEqual('b1')
    })

    it('has a white bishop in the c1 position', () => {
        expect(app.state().chessBoard.c1.piece.type).toEqual('bishop')
        expect(app.state().chessBoard.c1.piece.color).toEqual('white')
        expect(app.state().chessBoard.c1.piece.currentPosition).toEqual('c1')
    })

    it('has the white queen in the d1 position', () => {
        expect(app.state().chessBoard.d1.piece.type).toEqual('queen')
        expect(app.state().chessBoard.d1.piece.color).toEqual('white')
        expect(app.state().chessBoard.d1.piece.currentPosition).toEqual('d1')
    })

    it('has the white king in the e1 position', () => {
        expect(app.state().chessBoard.e1.piece.type).toEqual('king')
        expect(app.state().chessBoard.e1.piece.color).toEqual('white')
        expect(app.state().chessBoard.e1.piece.currentPosition).toEqual('e1')
    })

    it('has a white bishop in the f1 position', () => {
        expect(app.state().chessBoard.f1.piece.type).toEqual('bishop')
        expect(app.state().chessBoard.f1.piece.color).toEqual('white')
        expect(app.state().chessBoard.f1.piece.currentPosition).toEqual('f1')
    })

    it('has a white knight in the g1 position', () => {
        expect(app.state().chessBoard.g1.piece.type).toEqual('knight')
        expect(app.state().chessBoard.g1.piece.color).toEqual('white')
        expect(app.state().chessBoard.g1.piece.currentPosition).toEqual('g1')
    })

    it('has a white rook in the h1 position', () => {
        expect(app.state().chessBoard.h1.piece.type).toEqual('rook')
        expect(app.state().chessBoard.h1.piece.color).toEqual('white')
        expect(app.state().chessBoard.h1.piece.currentPosition).toEqual('h1')
    })

    it('has a selected state', () => {
        expect(app.state().selected).toEqual(null)
        const pawn = app.state().chessBoard.a7.piece
        app.state().selected = pawn
        expect(app.state().selected).toEqual(pawn)
    })

    describe('#updatedTurn', () => {
        xit('test', () => {

        })
    })

    describe('#move', () => {
        beforeEach(() => {
          app.state().moves = []
          app.state().turn = 'white'
          app.state().selected = null
        })

        it('can move to a different square', () => {
            const pawn = app.state().chessBoard.a7.piece
            app.state().selected = pawn
            app.instance().move('a6')
            expect(pawn.currentPosition).toEqual('a6')
            expect(app.state().chessBoard.a6.piece).toEqual(pawn)
            expect(app.state().chessBoard.a7.piece).toEqual(null)

            app.state().chessBoard.a6.piece = null
            app.state().selected = null
            app.state().chessBoard.a7.piece = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'a7'
            }
        })

        it('changes the turn to black if white moves', () => {
            const pawn = app.state().chessBoard.a2.piece
            expect(app.state().turn).toEqual('white')
            app.state().selected = pawn
            app.state().board = JSON.parse(JSON.stringify(jsonChessBoard))
            app.instance().move('a4')

            expect(app.state().turn).toEqual('black')

            app.state().chessBoard.a4.piece = null
            app.state().selected = null
            app.state().chessBoard.a2.piece = {
                'type': 'pawn',
                'color': 'white',
                'currentPosition': 'a2'
            }
        })

        it('changes the turn to white if black moves', () => {
            const pawn = app.state().chessBoard.a7.piece
            app.state().turn = 'black'
            app.state().selected = pawn
            app.instance().move('a5')

            expect(app.state().turn).toEqual('white')

            app.state().chessBoard.a5.piece = null
            app.state().chessBoard.a7.piece = {
                'type': 'pawn',
                'color': 'black',
                'currentPosition': 'a7'
            }
        })

        it('does not change turns if the move is invalid', () => {
            const pawn = app.state().chessBoard.a7.piece
            app.state().turn = 'black'
            app.state().selected = pawn
            app.instance().move('a1')

            expect(app.state().turn).toEqual('black')
        })

        it('updates the state of the moves after every move', () => {
          let pawn = app.state().chessBoard.a7.piece
          app.state().selected = pawn
          app.instance().move('a6')
          expect(app.state().moves).toEqual([pawn])

          app.state().moves = []
          app.state().chessBoard.a6.piece = null
          app.state().chessBoard.a7.piece = {
              'type': 'pawn',
              'color': 'black',
              'currentPosition': 'a7'
          }
        })
    })

    describe('#handleSelected', () => {
        beforeEach(() => {
            app.state().selected = null
            app.state().turn = 'black'
        })

        it('sets the state of selected to the selected object', () => {
            let piece = {
              'id': '1',
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'a8'
            }

            app.instance().handleSelected(piece)
            expect(app.state().selected).toEqual(app.state().chessBoard.a8.piece)
        })

        it('sets the previousBoard state to null', () => {
            let rook = {
              'id': '1',
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'a8'
            }

            app.state().selected = rook
            app.state().previousBoard = app.state().chessBoard
            app.instance().handleSelected(rook)
            expect(app.state().previousBoard).toEqual(null)
        })

        it('does not allow a piece to be selected if it is not the turn of that piece', () => {
          let rook = {
              'id': '1',
              'type': 'rook',
              'color': 'black',
              'currentPosition': 'a8'
          }
          app.state().turn = 'white'
          app.instance().handleSelected(rook)
          expect(app.state().selected).toEqual(null)
        })
    })

    describe('#isValid', () => {
      xit('#test', () => {

      })
    })

    describe('#handleSignUpForm', () => {
        xit('#test', () => {

        })
    })
    describe('#handleUserEmail', () => {
        xit('#test', () => {

        })
    })

    describe('#handleUserPassword', () => {
        xit('#test', () => {

        })
    })

    describe('#signUpForm', () => {
        xit('#test', () => {

        })
    })

    describe('#handleReset', () => {
        xit('#test', () => {

        })
    })

    describe('#handleMoveLog', () => {
        xit('#test', () => {

        })
    })

    describe('#pawnMovedTwo', () => {
        xit('#test', () => {

        })
    })

    describe('#isCheckmate', () => {
        xit('#test', () => {

        })
    })

    describe('#isStalemate', () => {
        xit('#test', () => {

        })
    })

    describe('#handleCrossedPawn', () => {
        xit('#test', () => {

        })
    })

    describe('#handlePreviousBoard', () => {
        xit('#test', () => {

        })
    })

    describe('#board', () => {
        xit('#test', () => {

        })
    })

    describe('#handleChallengePlayer', () => {
        xit('#test', () => {

        })
    })

    describe('#handleCancelChallenge', () => {
        xit('#test', () => {

        })
    })

    describe('#handlePlayerColor', () => {
        xit('#test', () => {

        })
    })

    describe('#handleChallengeInfo', () => {
        xit('#test', () => {

        })
    })

    describe('#handleSubmitChallenge', () => {
        xit('#test', () => {

        })
    })

    describe('#handleMyGamesActive', () => {
        xit('#test', () => {

        })
    })
    describe('#boardConfiguration', () => {
        xit('#test', () => {

        })
    })

    describe('#handleCurrentGame', () => {
        xit('#test', () => {

        })
    })

    describe('#handleAcceptChallenge', () => {
        xit('#test', () => {

        })
    })

    describe('#signUpJson', () => {
      xit('#test', () => {
        
      })
    })
})
