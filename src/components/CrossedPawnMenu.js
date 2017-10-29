import React, { Component } from 'react'
import '../styles/CrossedPawnMenu.css'
import { connect } from 'react-redux'
import {
  getChessBoard,
  getCrossedPawn
} from '../actions/index'

class CrossedPawnMenu extends Component {
  constructor() {
    super()

    this.handleCrossedPawn = this.handleCrossedPawn.bind(this)
  }

  handleCrossedPawn(event) {
    let classNames = event.target.className.split("-")
    let pieceType

    if (classNames.includes('knight piece')) {
      pieceType = 'knight'
    }
    if (classNames.includes('bishop piece')) {
      pieceType = 'bishop'
    }

    if (classNames.includes('tower piece')) {
      pieceType = 'rook'
    }

    if (classNames.includes('queen piece')) {
      pieceType = 'queen'
    }

    let coordinates = this.props.moves.slice(-1)[0].currentPosition
    let board = JSON.parse(JSON.stringify(this.props.chessBoard))
    board[coordinates].piece.type = pieceType

    // this.setState({
    //   chessBoard: board,
    //   crossedPawn: false
    // })

    this.props.dispatch(getChessBoard(board))
    this.props.dispatch(getCrossedPawn(false))
  }

  render() {
    return(
      <div className='crossedPawnMenu col-xs-2'>
        <i className={`glyphicon glyphicon-knight piece-${this.props.color} piece`}
          onClick={this.handleCrossedPawn}>
        </i>
        <i className={`glyphicon glyphicon-bishop piece-${this.props.color} piece`}
          onClick={this.props.handleCrossedPawn}>
        </i>
        <i className={`glyphicon glyphicon-tower piece-${this.props.color} piece`}
          onClick={this.props.handleCrossedPawn}>
        </i>
        <i className={`glyphicon glyphicon-queen piece-${this.props.color} piece`}
          onClick={this.props.handleCrossedPawn}>
        </i>
      </div>
    )
  }
}

const mapStateToProps = ({
}) => {
  return {
  }
}

export default connect(mapStateToProps)(CrossedPawnMenu)
