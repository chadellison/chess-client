import React, { Component } from 'react'
import '../styles/AnalysisKey.css'
import { connect } from 'react-redux'

class AnalysisKey extends Component {
  render() {
    return(
      <div>
        <div className='analyticsKey container-fluid'>
          <div className='row analyticsKey'>
            <div className='whiteWinPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>{`White Wins: ${this.props.chartData[0].value}`}</p>
          </div>
          <div className='row analyticsKey'>
            <div className='blackWinPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>{`Black Wins: ${this.props.chartData[1].value}`}</p>
          </div>
          <div className='row analyticsKey'>
            <div className='drawPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>{`Draws: ${this.props.chartData[2].value}`}</p>
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
