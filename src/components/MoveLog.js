import React, { Component } from 'react'

class MoveLog extends Component {
    get moves() {
        return this.props.moves.map((piece, index) => {
            return <div key={index}>{`${piece.type}: ${piece.currentPosition}`}</div>
        })
    }
    render() {
        return(
          <div>
              {this.moves}
              <button onClick={this.props.cancelMoveLog}>Cancel</button>
          </div>
        )
    }
}

export default MoveLog
