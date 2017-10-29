import React, {Component} from 'react'
import './styles/App.css'
import Board from './components/Board.js'
import ThumbNails from './components/ThumbNails.js'
import JsonResponse from './helpers/JsonResponseHelper'
import CrossedPawnMenu from './components/CrossedPawnMenu'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Footer from './components/Footer'
import GameService from './services/GameService'
import { connect } from 'react-redux'
import {
  getMessageToUser,
  getUserGames
} from './actions/index'

class App extends Component {
  constructor() {
    super()

    this.gameService = new GameService()

    this.handleSubmitChallenge = this.handleSubmitChallenge.bind(this)
    this.handleEndGame         = this.handleEndGame.bind(this)
  }

  handleSubmitChallenge() {
    // this should move into sidebar these bits of state no longer exist
    let gameBody = {}
    if(this.props.challengeRobot) {
      gameBody.challengedName = 'robot'
      gameBody.challengedEmail = 'robot'
      gameBody.challengerColor = this.props.challengeColor
      gameBody.human = false
    } else {
      gameBody.challengedName = this.props.challengedName
      gameBody.challengedEmail = this.props.challengedEmail
      gameBody.challengerColor = this.props.challengeColor
      gameBody.human = true

    }
    this.gameService.createGame(gameBody, this.state.token)
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        JsonResponse.handleSubmitChallenge(responseJson, this.state.userGames, this.state.challengedName)
      )
    })
    .catch((error) => alert(error))
  }

  handleEndGame(outcome, resign, game_id) {
    this.gameService.endGame(outcome, resign, game_id, this.props.token)
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.dispatch(getMessageToUser(outcome))
      let updatedUserGames = this.props.userGames.map((userGame) => {
        if(userGame.id === responseJson.data.id) {
          userGame.attributes.outcome = outcome
        }
        return userGame
      })

      this.props.dispatch(getUserGames(updatedUserGames))
      this.props.getCurrentGame(responseJson.data)
    })
  }

  get crossedPawn() {
    let crossedPawn
    if (this.props.crossedPawn) {
      crossedPawn = <CrossedPawnMenu
        color={this.props.moves.slice(-1)[0].color}
      />
    }
    return crossedPawn
  }

  get board() {
    if(this.props.previousBoard) {
      return this.props.previousBoard
    } else {
      return this.props.chessBoard
    }
  }

  get gameData() {
    if (this.props.currentGameActive) {
      return <Header currentGame={this.props.currentGame} />
    } else {
      return null
    }
  }

  get gameView() {
    if(this.props.thumbnails) {
      return <ThumbNails handleEndGame={this.handleEndGame} />
    } else {
      return(
        <div>
          {this.gameData}
          <Board />
        </div>
      )
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='container-fluid'>
          {this.gameView}
          {this.crossedPawn}
          <SideBar
            challengePlayer={this.props.challengePlayer}
            challengeColor={this.props.challengeColor}
            handleSubmitChallenge={this.handleSubmitChallenge}
            handleEndGame={this.handleEndGame}
            updateSignInInfo={this.updateSignInInfo}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({
  thumbnails, userGames, token, currentGame, currentGameActive, previousBoard
}) => {
  return {
    thumbnails, userGames, token, currentGame, currentGameActive, previousBoard
  }
}

export default connect(mapStateToProps)(App)
