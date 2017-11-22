import React, { Component } from 'react'
import '../styles/AnalysisKey.css'
import { connect } from 'react-redux'

class AnalysisKey extends Component {
  winPercentage(color) {
    let whiteWins = parseInt(this.props.chartData[0].value, 10)
    let blackWins = parseInt(this.props.chartData[1].value, 10)
    let draws = parseInt(this.props.chartData[2].value, 10)
    let totalGames = whiteWins + blackWins + draws

    if (totalGames === 0) {
      return '0%'
    } else {
      if (color === 'white') {
        return `${Math.round((whiteWins / totalGames) * 10000) / 100}%`
      } else if(color === 'black') {
        return `${Math.round((blackWins / totalGames) * 10000) / 100}%`
      } else {
        return `${Math.round((draws / totalGames) * 10000) / 100}%`
      }
    }
  }

  render() {
    return(
      <div>
        <div className='analyticsKey container-fluid'>
          <div className='row analyticsKey'>
            <div className='whiteWinPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>{`White Wins: ${this.winPercentage('white')}`}</p>
          </div>
          <div className='row analyticsKey'>
            <div className='blackWinPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>{`Black Wins: ${this.winPercentage('black')}`}</p>
          </div>
          <div className='row analyticsKey'>
            <div className='drawPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>{`Draws: ${this.winPercentage('draw')}`}</p>
          </div>
        </div>
        <button className='analyticsButton' onClick={this.props.handleAnalyticsChart}>Hide Analytics</button>
      </div>
    )
  }
}

const mapStateToProps = ({ chartData }) => {
  return { chartData }
}

export default connect(mapStateToProps)(AnalysisKey)
