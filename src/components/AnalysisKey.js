import React, { Component } from 'react'
import '../styles/AnalysisKey.css'

export default class AnalysisKey extends Component {
  render() {
    return(
      <div>
        <div className='analyticsKey container-fluid'>
          <div className='row analyticsKey'>
            <div className='whiteWinPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>White</p>
          </div>
          <div className='row analyticsKey'>
            <div className='blackWinPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>Black</p>
          </div>
          <div className='row analyticsKey'>
            <div className='drawPercentage col-xs-1'></div>
            <p className='col-xs-2 analyticsText'>Draw</p>
          </div>
        </div>
        <button className='analyticsButton' onClick={this.props.handleAnalyticsChart}>Hide Analytics</button>
      </div>
    )
  }
}
