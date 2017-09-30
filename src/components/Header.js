import React, { Component } from 'react'
import '../styles/Header.css'

export default class Header extends Component {
  get formatName() {
    return this.props.currentGame.attributes.opponentName.charAt(0).toUpperCase() +
      this.props.currentGame.attributes.opponentName.slice(1)
  }

  get gravatar() {
    if (this.props.currentGame.attributes.human) {
      return `https://www.gravatar.com/avatar/${this.props.currentGame.attributes.opponentGravatar}`
    } else {
      return `https://robohash.org/${this.props.currentGame.attributes.opponentGravatar}`
    }
  }

  get outcome() {
    if (this.props.currentGame.attributes.outcome) {
      return <h5>{ this.props.currentGame.attributes.outcome }</h5>
    } else {
      return null
    }
  }

  render() {
    return(
      <div className='gameData pull-left col-xs-1'>
        <h4 className='gameDataName'>{this.formatName}</h4>
        <img className='gameDataGravatar' src={ this.gravatar } alt="gravatar"/>
        {this.outcome}
      </div>
    )
  }
}
