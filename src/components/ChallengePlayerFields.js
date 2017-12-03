import React, { Component } from 'react'
import '../styles/ChallengePlayerFields.css'
import { connect } from 'react-redux'
import { getChallengedName, getChallengedEmail } from '../actions/index'

class ChallengePlayerFields extends Component {
  constructor() {
    super()
    this.handleChallengedInfo = this.handleChallengedInfo.bind(this)
  }

  handleChallengedInfo(event) {
    if(event.target.className === 'challengedFirstName') {
      this.props.dispatch(getChallengedName(event.target.value))
    }

    if(event.target.className === 'challengedEmail') {
      this.props.dispatch(getChallengedEmail(event.target.value))
    }
  }

  render() {
    return(
      <div>
        <h5>Enter the name and email of the person you would like to challenge</h5>
        <input className='challengedFirstName'
          placeholder='Name'
          onChange={this.handleChallengedInfo}>
        </input>
        <input className='challengedEmail'
          placeholder='Email'
          onChange={this.handleChallengedInfo}>
        </input>
      </div>
    )
  }
}
const mapStateToProps = () => {}
export default connect(mapStateToProps)(ChallengePlayerFields)
