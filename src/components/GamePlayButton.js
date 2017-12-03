import React, { Component } from 'react'
import '../styles/GamePlayButton.css'
import { connect } from 'react-redux'
import { getChallengePlayer, getChallengeRobot } from '../actions/index'

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
const mapStateToProps = () => {}
export default connect(mapStateToProps)(GamePlayButton)
