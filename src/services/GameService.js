import API_HOST from "../config/ApiHost.js"

export default class GameService {
  constructor() {
    this.headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }

  createGame(gameBody, token) {
    let body = JSON.stringify({
      game: gameBody,
      token: token,
    })
    return (
      fetch(`${API_HOST}/api/v1/games`, {
        method: 'POST',
        headers: this.headers,
        body: body
      })
    )
  }

  createAiGame() {
    return (
      fetch(`${API_HOST}/api/v1/ai_game`, {
        method: 'POST',
        headers: this.headers
      })
    )
  }

  fetchGames(token, page) {
    return (
      fetch(`${API_HOST}/api/v1/games?token=${token}&page=${page}`, {
        method: 'GET',
        headers: this.headers
      })
    )
  }

  fetchAnalytics(notation) {
    let body = JSON.stringify({ moves: { moveSignature: notation.join('') } })
    return (
      fetch(`${API_HOST}/api/v1/analytics`, {
        method: 'PATCH',
        headers: this.headers,
        body: body
      })
    )
  }

  fetchAiMove(notation, aiGameId) {
    return (
      fetch(`${API_HOST}/api/v1/moves/${aiGameId}`, {
        method: 'GET',
        headers: this.headers
      })
    )
  }

  makeMove(gameId, piece, token) {
    let body = JSON.stringify({
      move: {
        startIndex: piece.startIndex,
        currentPosition: piece.currentPosition,
        movedTwo: piece.movedTwo,
        pieceType: piece.type,
        notation: piece.notation
      },

      token: token,
      id: gameId
    })
    return (
      fetch(`${API_HOST}/api/v1/moves`, {
        method: 'POST',
        headers: this.headers,
        body: body
      })
    )
  }

  acceptGame(game_id, token) {
    return (
      fetch(`${API_HOST}/api/v1/accept_challenge/${game_id}?token=${token}`, {
        method: 'GET',
        headers: this.headers
      })
    )
  }

  archiveGame(game_id, token) {
    return (
      fetch(`${API_HOST}/api/v1/games/${game_id}?token=${token}`, {
        method: 'DELETE',
        headers: this.headers
      })
    )
  }

  endGame(outcome, resign, game_id, token) {
    let body = JSON.stringify({
      outcome: outcome,
      resign: resign,
      token: token
    })

    return (
      fetch(`${API_HOST}/api/v1/game_over/${game_id}`, {
        method: 'PATCH',
        headers: this.headers,
        body: body
      })
    )
  }
}
