export default class JsonResponse {
  static handleSignUp(responseJson, firstName, email) {
    if (responseJson.errors) {
      return {messageToUser: responseJson.errors, signUpFormActive: true}
    } else {
      let message = `Great ${firstName}! Please check your email at ${email} to confirm your account!`
      return {
        messageToUser: message,
        signUpFormActive: false,
        signInFormActive: false,
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      }
    }
  }

  static handleSignIn(responseJson) {
    if (responseJson.errors) {
      return {messageToUser: responseJson.errors}
    } else {
      return({
        token: responseJson.data.attributes.token,
        signInFormActive: false,
        signUpFormActive: false,
        loggedIn: true,
        messageToUser: 'Welcome to Chess Mail!',
        hashedEmail: responseJson.data.attributes.hashed_email,
        email: '',
        password: '',
        firstName: responseJson.data.attributes.firstName,
        lastName: responseJson.data.attributes.lastName,
        userGames: responseJson.data.included,
        thumbNails: true,
        myGamesActive: true
      })
    }
  }

  static handleSubmitChallenge(responseJson, userGames, challengedName) {
    if (responseJson.errors) {
      return({ messageToUser: responseJson.errors })
    } else {
      let updatedUserGames = userGames
      updatedUserGames.push(responseJson.data)

      return({
        userGames: updatedUserGames,
        messageToUser: `Your challenge has been submitted to ${challengedName}!`,
        challengePlayer: false,
        challengedName: '',
        challengedEmail: '',
      })
    }
  }

  static handleMakeMove(responseJson, updatedUserGames, piece) {
    return updatedUserGames.map((userGame) => {
      if(userGame.id === responseJson.data.id) {
        let newPiece = responseJson.data.included.filter((gamePiece) => {
          return gamePiece.attributes.startIndex === piece.startIndex
        })[0]
        userGame.included.push(newPiece)
      }
      return userGame
    })
  }

  static handleEndGame(responseJson, updatedUserGames, outcome) {
    return updatedUserGames.map((userGame) => {
      if(userGame.id === responseJson.data.id) {
        userGame.attributes.outcome = outcome
      }
      return userGame
    })
  }

  static handleArchiveGame(updatedUserGames, game_id) {
    return updatedUserGames.filter((userGame) => {
      return userGame.id !== game_id
    })
  }
}
