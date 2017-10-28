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
        <ThumbNail key={game.id - index}
          game={game}
          // handleAcceptChallenge={this.props.handleAcceptChallenge}
          // handleArchiveGame={this.props.handleArchiveGame}
          // handleEndGame={this.props.handleEndGame}
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

const mapStateToProps = ({
  userGames
}) => {
  return {
    userGames
  }
}

export default connect(mapStateToProps)(ThumbNails)
