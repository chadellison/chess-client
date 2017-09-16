import React, { Component } from 'react'
import '../styles/Loader.css'
import spinner from '../images/spinner.svg';

export default class Loader extends Component {
  render() {
    return(
      <div className='loader'>
        <img className='spinner' src={spinner} alt='spinner'></img>
      </div>
    )
  }
}
