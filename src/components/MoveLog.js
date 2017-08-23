import React, { Component } from 'react'
import '../styles/MoveLog.css'

class MoveLog extends Component {
    get moves() {
        let gameMoves = this.props.moves.map((piece, index) => {
            return(
              <div key={index} id={index} className='col-xs-6 move'>
                  {`${piece.type}: ${piece.currentPosition}`}
              </div>
            )
        })
        return (
            <div className='row'>
                <div className='col-xs-6 move'>White</div>
                <div className='col-xs-6 move'>Black</div>
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
