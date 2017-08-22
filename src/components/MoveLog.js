import React, { Component } from 'react'
import '../styles/MoveLog.css'

class MoveLog extends Component {
    get moves() {
        let gameMoves = this.props.moves.map((piece, index) => {
            return(
              <div key={index} className='col-xs-6'>{`${piece.type}: ${piece.currentPosition}`}</div>
            )
        })
        return (
            <div className='row'>
                <div className='col-xs-6'>White</div>
                <div className='col-xs-6'>Black</div>
                <hr className='lineBreak'></hr>
                {gameMoves}
            </div>
        )
    }
    render() {
        return(
          <div>
              <button onClick={this.props.cancelMoveLog} className='hideMoveLogButton'>Hide</button>
              {this.moves}
          </div>
        )
    }
}

export default MoveLog
