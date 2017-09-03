import React, { Component } from 'react'
import ThumbNail from './ThumbNail'
import '../styles/ThumbNails.css'

export default class ThumbNails extends Component {
  get thumbNails() {
    return this.props.userGames.map((game) => {
      return <ThumbNail key={game.id} game={game} moveLogic={this.props.moveLogic} />
    })
  }

  render() {
    return(
      <div className="col-xs-8">
        <h3>Games In Progress</h3>
        {this.thumbNails}
      </div>
    )
  }
}
