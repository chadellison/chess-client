import React, { Component } from 'react'
import '../styles/ChallengeForm.css'
import ChallengePlayerFields from './ChallengePlayerFields'
import ColorSelection from './ColorSelection'
import GameService from '../services/GameService'
import { connect } from 'react-redux'
import {
  getChallengeColor,
  getLoading,
  getMessageToUser,
  getUserGames,
  getChallengePlayer,
  getChallengeRobot,
  getChallengedName,
  getChallengedEmail
} from '../actions/index'

class ChallengeForm extends Component {
  constructor() {
    super()
    this.gameService = new GameService()

    this.handleChallengeColor  = this.handleChallengeColor.bind(this)
    this.handleSubmitChallenge = this.handleSubmitChallenge.bind(this)
    this.handleCancelChallenge = this.handleCancelChallenge.bind(this)
  }

  handleChallengeColor(event) {
    let color

    if(event.target.className.includes('white')) {
      color = 'white'
    }
    if(event.target.className.includes('black')) {
      color = 'black'
    }
    this.props.dispatch(getChallengeColor(color))
  }

  handleSubmitChallenge() {
    this.props.dispatch(getLoading(true))
    this.gameService.createGame(this.handleGameBody(), this.props.token)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.errors) {
          this.props.dispatch(getMessageToUser(responseJson.errors))
        } else {
          let updatedUserGames = JSON.parse(JSON.stringify(this.props.userGames))
          updatedUserGames.unshift(responseJson.data)
          this.props.dispatch(getUserGames(updatedUserGames))
          if(this.props.challengePlayer) {
            this.props.dispatch(getMessageToUser(`Your challenge has been submitted to ${this.props.challengedName}!`))
          }
          this.props.dispatch(getChallengePlayer(false))
          this.props.dispatch(getChallengeRobot(false))
          this.props.dispatch(getChallengedName(''))
          this.props.dispatch(getChallengedEmail(''))
          this.props.dispatch(getLoading(false))
        }
    })
    .catch((error) => alert(error))
  }

  handleGameBody() {
    let gameBody = {}
    if(this.props.challengeRobot) {
      gameBody.challengedName = 'robot'
      gameBody.challengedEmail = 'robot'
      gameBody.challengerColor = this.props.challengeColor
      gameBody.robot = true
    } else {
      gameBody.challengedName = this.props.challengedName
      gameBody.challengedEmail = this.props.challengedEmail
      gameBody.challengerColor = this.props.challengeColor
    }
    return gameBody
  }

  handleCancelChallenge() {
    this.props.dispatch(getChallengePlayer(false))
    this.props.dispatch(getChallengeRobot(false))
    this.props.dispatch(getChallengedName(''))
    this.props.dispatch(getChallengedEmail(''))
    this.props.dispatch(getChallengeColor('white'))
  }

  get challengePlayerFields() {
    if(this.props.challengePlayer) {
      return <ChallengePlayerFields />
    } else {
      return null
    }
  }

  get challengeColorButtons() {
    let selection = this.props.challengeColor === 'white' ? 'white' : 'black'
    return <ColorSelection handleChallengeColor={this.handleChallengeColor}
      select={selection}
    />
  }

  render() {
    return(
      <div>
        {this.challengePlayerFields}
        {this.challengeColorButtons}
        <button className='challengeButton' onClick={this.handleSubmitChallenge}>
          Challenge
        </button>
        <button className='cancelButton' onClick={this.handleCancelChallenge}>
          Cancel
        </button>
      </div>
    )
  }
}
const mapStateToProps = ({
  challengePlayer, challengeColor, challengedName, challengedEmail, token,
  userGames, challengeRobot
 }) => {
  return {
    challengePlayer, challengeColor, challengedName, challengedEmail, token,
    userGames, challengeRobot
  }
}

export default connect(mapStateToProps)(ChallengeForm)
