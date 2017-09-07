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

  fetchGames(token) {
    return (
      fetch(`${API_HOST}/api/v1/games?token=${token}`, {
        method: 'GET',
        headers: this.headers
      })
    )
  }

  updateGame(game_id, piece, token) {
    piece.pieceType = piece.type
    
    let body = JSON.stringify({
      piece: piece,
      token: token
    })
    return (
      fetch(`${API_HOST}/api/v1/games/${game_id}`, {
        method: 'PATCH',
        headers: this.headers,
        body: body
      })
    )
  }

  acceptGame(game_id, token) {
    return (
      fetch(`${API_HOST}/api/v1/games/accept/${game_id}?token=${token}`, {
        method: 'GET',
        headers: this.headers
      })
    )
  }
}
