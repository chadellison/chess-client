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
  getTurn,
  getChessBoard,
  getSelected,
  getMessageToUser,
  getLoading
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

    this.handleReset           = this.handleReset.bind(this)
    this.handleCrossedPawn     = this.handleCrossedPawn.bind(this)
    this.handleMyGamesActive   = this.handleMyGamesActive.bind(this)
    this.handleCurrentGame     = this.handleCurrentGame.bind(this)
    this.handleUpdatePage      = this.handleUpdatePage.bind(this)

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

  // handleSelected(selectedPiece) {
  //   if (this.props.chessBoard[selectedPiece.currentPosition].piece) {
  //     if (selectedPiece.color === this.props.turn) {
  //       if (!this.state.selected) {
  //         if (this.state.currentGameActive && this.state.playerColor !== this.props.turn) {
  //           this.props.dispatch(getMessageToUser(`You may only move the ${this.state.playerColor} pieces`))
  //         } else {
  //           let board = JSON.parse(JSON.stringify(this.props.chessBoard))
  //           let piece = JSON.parse(JSON.stringify(selectedPiece))
  //           let gameMoves = JSON.parse(JSON.stringify(this.state.moves))
  //
  //           let availableMoves = this.moveLogic.movesForPiece(piece, board, gameMoves).filter((move) => {
  //             return this.isValid(piece, move, board, gameMoves)
  //           })
  //
  //           piece.availableMoves = availableMoves
  //           board[piece.currentPosition].piece = piece
  //
  //           this.props.dispatch(getSelected(piece))
  //           this.setState({
  //             selected: piece,
  //             chessBoard: board
  //           })
  //         }
  //       }
  //     } else {
  //       this.props.dispatch(getMessageToUser(`${this.props.turn}'s turn`))
  //     }
  //   }
  //   this.setState({
  //     previousBoard: null
  //   })
  // }

  // handlePreviousBoard(event) {
  //   let index = parseInt(event.target.id, 10)
  //   let gameMoves = this.state.moves.slice(0, index + 1)
  //   let board = JSON.parse(JSON.stringify(jsonChessBoard))
  //
  //   board = this.moveLogic.setBoard(gameMoves, board)
  //
  //   this.setState({
  //     previousBoard: board,
  //     selected: null
  //   })
  // }

  handleReset() {
    this.props.dispatch(getMessageToUser(''))
    this.setState({
      chessBoard: JSON.parse(JSON.stringify(jsonChessBoard)),
      previousBoard: null,
      moves: [],
      turn: 'white',
      checkmate: false,
      stalemate: false,
      selected: null,
      crossedPawn: false
    })
  }

  handleMyGamesActive() {
    this.props.dispatch(getMessageToUser(''))
    this.setState({
      myGamesActive: !this.state.myGamesActive,
      thumbNails: !this.state.thumbNails,
      currentGameActive: !this.state.currentGameActive
    })
  }

  handleCurrentGame(game) {
    if (game.attributes.pending) {
      // let messageToUser

      if (game.attributes.isChallenger) {
        // messageToUser = `${game.attributes.opponentName} has not yet accepted your challenge.`
        this.props.dispatch(getMessageToUser(`${game.attributes.opponentName} has not yet accepted your challenge.`))
      } else {
        // messageToUser = `Awaiting your acceptance from ${game.attributes.opponentName}.`
        this.props.dispatch(getMessageToUser(`Awaiting your acceptance from ${game.attributes.opponentName}.`))
      }
      // this.setState({
      //   messageToUser: messageToUser
      // })
    } else {
      this.refreshGame(game)
    }
  }

  refreshGame(game) {
    let board = JSON.parse(JSON.stringify(jsonChessBoard))
    let gameMoves = game.included.map((piece) => {
      return {
        color: piece.attributes.color,
        type: piece.attributes.pieceType,
        currentPosition: piece.attributes.currentPosition,
        startIndex: piece.attributes.startIndex,
        hasMoved: piece.attributes.hasMoved,
        movedTwo: piece.attributes.movedTwo
      }
    })

    let turn = gameMoves.length % 2 === 0 ? 'white' : 'black'
    let currentGameBoard = this.moveLogic.setBoard(gameMoves, board)

    this.setState({
      myGamesActive: false,
      thumbNails: false,
      moves: gameMoves,
      turn: turn,
      playerColor: game.attributes.playerColor,
      currentGameActive: true,
      currentGame: game,
      chessBoard: currentGameBoard
    })
  }

  handleUpdatePage(event) {
    let currentPage = this.state.page

    if (event.target.classList.value.includes('right') && this.state.userGames.length === 6) {
      currentPage += 1
    }
    if (event.target.classList.value.includes('left') && this.state.page > 1) {
      currentPage -= 1
    }

    this.gameService.fetchGames(this.state.token, currentPage)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        page: currentPage,
        userGames: responseJson.data
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
    if(this.state.thumbNails) {
      return (
        <ThumbNails
          userGames={this.state.userGames}
          moveLogic={this.moveLogic}
          handleCurrentGame={this.handleCurrentGame}
          handleAcceptChallenge={this.handleAcceptChallenge}
          handleArchiveGame={this.handleArchiveGame}
          handleEndGame={this.handleEndGame}
        />
      )
    } else {
      return(
        <div>
          {this.gameData}
          <Board chessBoard={this.board}
            handleSelected={this.handleSelected}
            isSelected={this.state.selected}
            move={this.move}
            currentGameActive={this.state.currentGameActive}
            currentGame={this.state.currentGame}
          />
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
            moves={this.state.moves}
            // handlePreviousBoard={this.handlePreviousBoard}
            handleReset={this.handleReset}
            challengePlayer={this.state.challengePlayer}
            challengeColor={this.state.challengeColor}
            handleSubmitChallenge={this.handleSubmitChallenge}
            myGamesActive={this.state.myGamesActive}
            handleMyGamesActive={this.handleMyGamesActive}
            currentGameActive={this.state.currentGameActive}
            currentGame={this.state.currentGame}
            handleEndGame={this.handleEndGame}
          />
        </div>
        <Footer
          handleUpdatePage={this.handleUpdatePage}
          myGamesActive={this.state.myGamesActive}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ turn, chessBoard, messageToUser, loading }) => {
  return { turn, chessBoard, messageToUser, loading }
}

export default connect(mapStateToProps)(App)
