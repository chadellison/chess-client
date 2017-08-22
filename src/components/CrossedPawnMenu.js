import React, { Component } from 'react'
import '../styles/CrossedPawnMenu.css'

class CrossedPawnMenu extends Component {
    render() {
        return(
          <div className='crossedPawnMenu col-xs-2'>
              <i className={`glyphicon glyphicon-knight piece-${this.props.color} piece`}
                  onClick={this.props.handleCrossedPawn}>
              </i>
              <i className={`glyphicon glyphicon-bishop piece-${this.props.color} piece`}
                  onClick={this.props.handleCrossedPawn}>
              </i>
              <i className={`glyphicon glyphicon-tower piece-${this.props.color} piece`}
                  onClick={this.props.handleCrossedPawn}>
              </i>
              <i className={`glyphicon glyphicon-queen piece-${this.props.color} piece`}
                  onClick={this.props.handleCrossedPawn}>
              </i>
          </div>
        )
    }
}

export default CrossedPawnMenu
