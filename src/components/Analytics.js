import React, { Component } from 'react'
import '../styles/Analytics.css'
import AnalysisKey from './AnalysisKey'
import '../styles/Analytics.css'
import PieChart from 'react-simple-pie-chart'

export default class Analytics extends Component {
  render() {
    return(
      <div>
        <h3>Win Ratio</h3>
        <div className='chart'>
          <PieChart slices={this.props.chartData} />
        </div>
        <AnalysisKey handleAnalyticsChart={this.props.handleAnalyticsChart} />
      </div>
    )
  }
}
