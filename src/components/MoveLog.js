import React, { Component } from 'react'
import '../styles/MoveLog.css'
import { connect } from 'react-redux'
import jsonChessBoard from '../jsonChessBoard'
import MoveLogic from '../helpers/MoveLogic'
import GameService from '../services/GameService'
import {
  getPreviousBoard,
  getSelected,
  getChartData
} from '../actions/index'

class MoveLog extends Component {
  constructor() {
    super()
    this.moveLogic = new MoveLogic()
    this.gameService = new GameService()
    this.handlePreviousBoard = this.handlePreviousBoard.bind(this)
  }

  handlePreviousBoard(event) {
    if (!this.props.crossedPawn) {
      let index = parseInt(event.target.id, 10)
      let gameMoves = JSON.parse(JSON.stringify(this.props.moves.slice(0, index + 1)))
      let notation = JSON.parse(JSON.stringify(this.props.notation.slice(0, index + 1)))
      let board = JSON.parse(JSON.stringify(jsonChessBoard))

      this.updateAnalytics(notation)
      board = this.moveLogic.setBoard(gameMoves, board)
      this.props.dispatch(getPreviousBoard(board))
      this.props.dispatch(getSelected(null))
    }
  }

  updateAnalytics(notation) {
    if(this.props.analyticsChartActive) {
      this.gameService.fetchAnalytics(notation)
      .then(response => response.json())
      .then(responseJson => {
        let chartData = [
          { value: parseInt(responseJson.data.attributes.whiteWins, 10), color: '#cd853f' },
          { value: parseInt(responseJson.data.attributes.blackWins, 10), color: '#8b4513' },
          { value: parseInt(responseJson.data.attributes.draws, 10), color: '#7d8ca3' }
        ]
        this.props.dispatch(getChartData(chartData))
      })
      .catch((error) => alert(error))
    }
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
        <div className='col-xs-6 moveColumn'>White</div>
        <div className='col-xs-6 moveColumn'>Black</div>
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
  moves, previousBoard, selected, crossedPawn, analyticsChartActive, notation
 }) => {
  return {
    moves, previousBoard, selected, crossedPawn, analyticsChartActive, notation
  }
}

export default connect(mapStateToProps)(MoveLog)
