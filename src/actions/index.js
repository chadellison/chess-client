export const getTurn = (turn) => {
  return { type: 'GET_TURN', turn: turn === 'white' ? 'black' : 'white' };
};

export const getChessBoard = (chessBoard) => {
  return { type: 'GET_CHESSBOARD', chessBoard: chessBoard }
}

export const getPreviousBoard = (previousBoard) => {
  return { type: 'GET_PREVIOUS_BOARD', previousBoard: previousBoard }
}

export const getSelected = (selected) => {
  return { type: 'GET_SELECTED', selected: selected }
}

export const getMoveLogActive = (moveLogActive) => {
  return { type: 'GET_MOVE_LOG_ACTIVE', moveLogActive: moveLogActive }
}

export const getMessageToUser = (message) => {
  return { type: 'GET_MESSAGE_TO_USER', messageToUser: message }
}

export const getHashedEmail = (hashedEmail) => {
  return { type: 'GET_HASHED_EMAIL', hashedEmail: hashedEmail }
}

export const getLoading = (loading) => {
  return { type: 'GET_LOADING', loading: loading }
}

export const getChallengePlayer = (challengePlayer) => {
  return { type: 'GET_CHALLENGE_PLAYER', challengePlayer: challengePlayer }
}

export const getChallengeRobot = (challengeRobot) => {
  return { type: 'GET_CHALLENGE_ROBOT', challengeRobot: challengeRobot }
}

export const getChallengedName = (challengedName) => {
  return { type: 'GET_CHALLENGED_NAME', challengedName: challengedName }
}

export const getChallengedEmail = (challengedEmail) => {
  return { type: 'GET_CHALLENGED_EMAIL', challengedEmail: challengedEmail }
}

export const getChallengeColor = (challengeColor) => {
  return { type: 'GET_CHALLENGED_COLOR', challengeColor: challengeColor }
}

export const getEmail = (email) => {
  return { type: 'GET_EMAIL', email: email }
}

export const getPassword = (password) => {
  return { type: 'GET_PASSWORD', password: password }
}

export const getSignUpData = (signUpData) => {
  return { type: 'GET_SIGN_UP_DATA', signUpData: signUpData }
}

export const getSignUpFormActive = (signUpFormActive) => {
  return { type: 'GET_SIGN_UP_FORM_ACTIVE', signUpFormActive: signUpFormActive }
}

export const getSignInFormActive = (signInFormActive) => {
  return { type: 'GET_SIGN_IN_FORM_ACTIVE', signInFormActive: signInFormActive }
}

export const getFirstName = (firstName) => {
  return { type: 'GET_FIRST_NAME', firstName: firstName }
}

export const getLastName = (lastName) => {
  return { type: 'GET_LAST_NAME', lastName: lastName }
}

export const getToken = (token) => {
  return { type: 'GET_TOKEN', token: token }
}

export const getLoggedIn = (loggedIn) => {
  return { type: 'GET_LOGGED_IN', loggedIn: loggedIn }
}

export const getUserGames = (userGames) => {
  return { type: 'GET_USER_GAMES', userGames: userGames }
}

export const getThumbnails = (thumbnails) => {
  return { type: 'GET_THUMBNAILS', thumbnails: thumbnails }
}

export const getMyGamesActive = (myGamesActive) => {
  return { type: 'GET_MY_GAMES_ACTIVE', myGamesActive: myGamesActive }
}

export const getPlayerColor = (playerColor) => {
  return { type: 'GET_PLAYER_COLOR', playerColor: playerColor }
}

export const getCurrentGameActive = (currentGameActive) => {
  return { type: 'GET_CURRENT_GAME_ACTIVE', currentGameActive: currentGameActive }
}

export const getCurrentGame = (currentGame) => {
  return { type: 'GET_CURRENT_GAME', currentGame: currentGame }
}

export const getMoves = (moves) => {
  return { type: 'GET_MOVES', moves: moves }
}

export const getCheckmate = (checkmate) => {
  return { type: 'GET_CHECKMATE', checkmate: checkmate }
}

export const getCrossedPawn = (crossedPawn) => {
  return { type: 'GET_CROSSED_PAWN', crossedPawn: crossedPawn }
}

export const getStalemate = (stalemate) => {
  return { type: 'GET_STALEMATE', stalemate: stalemate }
}
