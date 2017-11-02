import React, {Component} from 'react'
import './styles/App.css'
import Board from './components/Board.js'
import ThumbNails from './components/ThumbNails.js'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Footer from './components/Footer'
import GameService from './services/GameService'
import { connect } from 'react-redux'
import {
  getMessageToUser,
  getUserGames,
  getCurrentGame
} from './actions/index'

class App extends Component {
  constructor() {
    super()

    this.gameService = new GameService()
    this.handleEndGame = this.handleEndGame.bind(this)
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
      this.props.dispatch(getCurrentGame(responseJson.data))
    })
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
          <SideBar handleEndGame={this.handleEndGame} />
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
