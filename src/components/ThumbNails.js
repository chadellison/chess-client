import React, { Component } from 'react'
import ThumbNail from './ThumbNail'
import '../styles/ThumbNails.css'

export default class ThumbNails extends Component {
  get thumbNails() {
    return this.props.userGames.map((game, index) => {
      return (
        <ThumbNail key={game.id + index}
          game={game} moveLogic={this.props.moveLogic}
          handleCurrentGame={this.props.handleCurrentGame}
          handleAcceptChallenge={this.props.handleAcceptChallenge}
          challengeAccepted={this.props.challengeAccepted}
        />
      )
    })
  }

  render() {
    return(
      <div className='col-xs-8 thumbNails'>
        <h3>Games In Progress</h3>
        {this.thumbNails}
      </div>
    )
  }
}
