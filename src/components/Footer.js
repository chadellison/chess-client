import React, { Component } from 'react'
import '../styles/Footer.css'
import GameService from '../services/GameService'
import { connect } from 'react-redux'
import {
  getPage,
  getUserGames
} from '../actions/index'

class Footer extends Component {
  constructor() {
    super()
    this.gameService = new GameService()
    this.handleUpdatePage = this.handleUpdatePage.bind(this)
  }

  handleUpdatePage(event) {
    let currentPage = this.props.page
    if (event.target.classList.value.includes('right') && this.props.userGames.length === 6) {
      currentPage += 1
    }
    if (event.target.classList.value.includes('left') && this.props.page > 1) {
      currentPage -= 1
    }

    this.gameService.fetchGames(this.props.token, currentPage)
    .then(response => response.json())
    .then(responseJson => {
      this.props.dispatch(getPage(currentPage))
      this.props.dispatch(getUserGames(responseJson.data))
    })
  }

  get pageArrows() {
    if (this.props.myGamesActive) {
      return (
        <div>
          <i className='glyphicon glyphicon-triangle-left' onClick={this.handleUpdatePage}></i>
          <i className='glyphicon glyphicon-triangle-right' onClick={this.handleUpdatePage}></i>
        </div>
      )
    } else {
      return null
    }
  }
  render() {
    return (
      <div className='footer'>
        {this.pageArrows}
      </div>
    )
  }
}

const mapStateToProps = ({
  page, userGames, token, myGamesActive
}) => {
  return {
    page, userGames, token, myGamesActive
  }
}

export default connect(mapStateToProps)(Footer)
