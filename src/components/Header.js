import React, { Component } from 'react'
import '../styles/Header.css'

export default class Header extends Component {
  get formatName() {
    return this.props.currentGame.attributes.opponentName.charAt(0).toUpperCase() +
      this.props.currentGame.attributes.opponentName.slice(1)
  }
  render() {
    return(
      <div className='gameData pull-left col-xs-1'>
        <h4 className='gameDataName'>{this.formatName}</h4>
        <img className='gameDataGravatar' src={`https://www.gravatar.com/avatar/${this.props.currentGame.attributes.opponentGravatar}`} alt="gravatar"/>
      </div>
    )
  }
}
