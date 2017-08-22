import React, { Component } from 'react'
import '../styles/MoveLog.css'

class MoveLog extends Component {
    get moves() {
        return this.props.moves.map((piece, index) => {
            return <div key={index}>{`${piece.type}: ${piece.currentPosition}`}</div>
        })
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
