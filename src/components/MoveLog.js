import React, { Component } from 'react'
import '../styles/MoveLog.css'
import { connect } from 'react-redux'
import jsonChessBoard from '../jsonChessBoard'
import MoveLogic from '../helpers/MoveLogic'
import {
  getPreviousBoard,
  getSelected
} from '../actions/index'

class MoveLog extends Component {
  constructor() {
    super()
    this.moveLogic = new MoveLogic()
    this.handlePreviousBoard = this.handlePreviousBoard.bind(this)
  }

  handlePreviousBoard(event) {
    let index = parseInt(event.target.id, 10)
    let gameMoves = this.props.moves.slice(0, index + 1)
    let board = JSON.parse(JSON.stringify(jsonChessBoard))

    board = this.moveLogic.setBoard(gameMoves, board)
    //
    // this.setState({
    //   previousBoard: board,
    //   selected: null
    // })
    this.props.dispatch(getPreviousBoard(board))
    this.props.dispatch(getSelected(null))
  }

  get moves() {
    let gameMoves = this.props.moves.map((piece, index) => {
      return(
        <div key={index} id={index}
          onClick={this.handlePreviousBoard}
          className='col-xs-6 move'>
          {`${piece.type}: ${piece.currentPosition}`}
        </div>
      )
    })
    return (
      <div className='row'>
        <div className='col-xs-6 move'>White</div>
        <div className='col-xs-6 move'>Black</div>
        <hr className='lineBreak'></hr>
        {gameMoves}
      </div>
    )
  }
  render() {
    return(
      <div>
        <button onClick={this.props.handleMoveLog} className='hideMoveLogButton'>
          Hide
        </button>
        {this.moves}
      </div>
    )
  }
}

const mapStateToProps = ({
  moves, previousBoard, selected
 }) => {
  return {
    moves, previousBoard, selected
  }
}

export default connect(mapStateToProps)(MoveLog)
