import React, { Component } from 'react'
import '../styles/Footer.css'

export default class Footer extends Component {
  get pageArrows() {
    if (this.props.myGamesActive) {
      return (
        <div>
          <i className='glyphicon glyphicon-triangle-left' onClick={this.props.handleUpdatePage}></i>
          <i className='glyphicon glyphicon-triangle-right' onClick={this.props.handleUpdatePage}></i>
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
