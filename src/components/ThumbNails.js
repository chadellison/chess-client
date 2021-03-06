import React, { Component } from 'react'
import ThumbNail from './ThumbNail'
import '../styles/ThumbNails.css'
import { connect } from 'react-redux'

class ThumbNails extends Component {
  get thumbNails() {
    if (this.props.userGames.length === 0) {
      return (
        <p>
          You currently have no games in progress. Challenge a player to get started.
        </p>
      )
    }
    return this.props.userGames.map((game, index) => {
      return (
        <ThumbNail
          key={game.id - index}
          handleEndGame={this.props.handleEndGame}
          game={game}
        />
      )
    })
  }

  render() {
    return(
      <div className='col-xs-9 thumbNails'>
        <h3 className='gamesInProgress'>Games In Progress</h3>
        {this.thumbNails}
      </div>
    )
  }
}

const mapStateToProps = (userGames) => userGames

export default connect(mapStateToProps)(ThumbNails)
