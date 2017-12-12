import React, { Component } from 'react'
import '../styles/GamePlayButton.css'
import { getChallengePlayer, getChallengeRobot } from '../actions/index'
import { connect } from 'react-redux'

class GamePlayButton extends Component {
  constructor() {
    super()
    this.handleChallenge = this.handleChallenge.bind(this)
  }

  handleChallenge(event) {
    if(event.target.textContent === 'Play Robot') {
      this.props.dispatch(getChallengeRobot(true))
    } else {
      this.props.dispatch(getChallengePlayer(true))
    }
  }

  render() {
    return(
      <button className='challengeButton' onClick={this.handleChallenge}>
        {this.props.content}
      </button>
    )
  }
}

const mapStateToProps = ({
}) => {
  return {}
}

export default connect(mapStateToProps)(GamePlayButton)
