import API_HOST from "../config/ApiHost.js"

export default class GameService {
  constructor() {
    this.headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }

  createGame(gameBody) {
    let body = JSON.stringify({
      game: {
        challengedName: gameBody.challengedName,
        challengedEmail: gameBody.challengedEmail,
        playerColor: gameBody.playerColor,
        challengePlayer: gameBody.challengePlayer,
        challengeRobot: gameBody.challengeRobot
      },
      token: gameBody.token,
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
      fetch(`${API_HOST}/api/v1/games${token}`, {
        method: 'Get',
        headers: this.headers
      })
    )
  }
}
