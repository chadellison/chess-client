import React, {Component} from 'react'
import './styles/App.css'
import jsonChessBoard from './jsonChessBoard'
import Board from './components/Board.js'
import ThumbNails from './components/ThumbNails.js'
import MoveLogic from './helpers/MoveLogic'
import JsonResponse from './helpers/JsonResponseHelper'
import CrossedPawnMenu from './components/CrossedPawnMenu'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Footer from './components/Footer'
import UserService from './services/UserService'
import GameService from './services/GameService'
import { connect } from 'react-redux'
import {
  getChessBoard,
  getSelected,
  getMessageToUser,
  getLoading,
} from './actions/index'

class App extends Component {
  constructor() {
    super()
    this.state = {
      page: 1
    }

    this.userService = new UserService()
    this.gameService = new GameService()
    this.moveLogic   = new MoveLogic()

    this.handleCrossedPawn     = this.handleCrossedPawn.bind(this)

    this.handleSubmitChallenge = this.handleSubmitChallenge.bind(this)
    this.handleAcceptChallenge = this.handleAcceptChallenge.bind(this)
    this.handleArchiveGame     = this.handleArchiveGame.bind(this)
    this.handleEndGame         = this.handleEndGame.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getChessBoard(jsonChessBoard))
    if (localStorage.getItem('state')) {
      let currentState = JSON.parse(localStorage.getItem('state'))

      this.gameService.fetchGames(currentState.token, 1)
      .then(response => response.json())
      .then(responseJson => {
        currentState.userGames = responseJson.data
        this.props.dispatch(getLoading(false))
        this.setState(currentState)
      })
      .catch((error) => {
        localStorage.removeItem('state')
        this.props.dispatch(getLoading(false))
      })
    } else {
      this.props.dispatch(getLoading(false))
    }
  }

  handleCrossedPawn(event) {
    let classNames = event.target.className.split("-")
    let pieceType

    if (classNames.includes('knight piece')) {
      pieceType = 'knight'
    }
    if (classNames.includes('bishop piece')) {
      pieceType = 'bishop'
    }

    if (classNames.includes('tower piece')) {
      pieceType = 'rook'
    }

    if (classNames.includes('queen piece')) {
      pieceType = 'queen'
    }

    let coordinates = this.state.moves.slice(-1)[0].currentPosition
    let board = JSON.parse(JSON.stringify(this.props.chessBoard))
    board[coordinates].piece.type = pieceType

    this.setState({
      chessBoard: board,
      crossedPawn: false
    })
  }

  handleSubmitChallenge() {
    // this should move into sidebar these bits of state no longer exist
    let gameBody = {}
    if(this.state.challengeRobot) {
      gameBody.challengedName = 'robot'
      gameBody.challengedEmail = 'robot'
      gameBody.challengerColor = this.state.challengeColor
      gameBody.human = false
    } else {
      gameBody.challengedName = this.state.challengedName
      gameBody.challengedEmail = this.state.challengedEmail
      gameBody.challengerColor = this.state.challengeColor
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

  handleAcceptChallenge(game_id) {
    this.gameService.acceptGame(game_id, this.state.token)
      .then(response => response.status)
      .then(responseStatus => this.handleAcceptChallengeJsonResponse(responseStatus))
      .catch((error) => alert(error))
  }

  handleAcceptChallengeJsonResponse(responseStatus) {
    if (responseStatus === 204) {
      this.gameService.fetchGames(this.state.token, this.state.page)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          userGames: responseJson.data
        })
      })
    }
  }

  handleArchiveGame(game_id) {
    this.gameService.archiveGame(game_id, this.state.token)
    .then(response => response.status)
    .then(responseStatus => {
      if (responseStatus === 204 || responseStatus === 404) {
        this.setState({
          userGames: JsonResponse.handleArchiveGame(this.state.userGames, game_id)
        })
      }
    })
    .catch((error) => alert(error))
  }

  handleEndGame(outcome, resign, game_id) {
    this.gameService.endGame(outcome, resign, game_id, this.state.token)
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.dispatch(getMessageToUser(outcome))
      this.setState({
        userGames: JsonResponse.handleEndGame(responseJson, this.state.userGames, outcome),
        currentGame: responseJson.data,
      })
    })
  }

  get crossedPawn() {
    let crossedPawn
    if (this.state.crossedPawn) {
      crossedPawn = <CrossedPawnMenu
        color={this.state.moves.slice(-1)[0].color}
        handleCrossedPawn={this.handleCrossedPawn}
      />
    }
    return crossedPawn
  }

  get board() {
    if(this.state.previousBoard) {
      return this.state.previousBoard
    } else {
      return this.props.chessBoard
    }
  }

  get gameData() {
    if (this.state.currentGameActive) {
      return <Header currentGame={this.state.currentGame} />
    } else {
      return null
    }
  }

  get gameView() {
    if(this.props.thumbnails) {
      return (
        <ThumbNails
          handleAcceptChallenge={this.handleAcceptChallenge}
          handleArchiveGame={this.handleArchiveGame}
          handleEndGame={this.handleEndGame}
        />
      )
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
            challengePlayer={this.state.challengePlayer}
            challengeColor={this.state.challengeColor}
            handleSubmitChallenge={this.handleSubmitChallenge}
            handleEndGame={this.handleEndGame}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ thumbnails, userGames }) => {
  return { thumbnails, userGames }
}

export default connect(mapStateToProps)(App)
