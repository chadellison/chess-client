import React, { Component } from 'react'
import '../styles/Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <i className='glyphicon glyphicon-triangle-left' onClick={this.props.handleUpdatePage}></i>
        <i className='glyphicon glyphicon-triangle-right' onClick={this.props.handleUpdatePage}></i>
      </div>
    )
  }
}
