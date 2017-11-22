import React, { Component } from 'react'
import '../styles/ColorSelection.css'

export default class ColorSelection extends Component {
  get whiteSelect() {
    return this.props.select === 'white' ? 'selectColor' : 'notSelected'
  }

  get blackSelect() {
    return this.props.select === 'black' ? 'selectColor' : 'notSelected'
  }

  render() {
    return(
      <div className='division'>
        <div className={`button col-xs-4 color-white ${this.whiteSelect}`} onClick={this.props.handleChallengeColor}>
          <i className='glyphicon glyphicon-pawn select-white' onClick={this.props.handleChallengeColor} />
          White
        </div>
        <div className={`button col-xs-4 color-black ${this.blackSelect}`} onClick={this.props.handleChallengeColor}>
          <i className='glyphicon glyphicon-pawn select-black' onClick={this.props.handleChallengeColor} />
          Black
        </div>
      </div>
    )
  }
}
