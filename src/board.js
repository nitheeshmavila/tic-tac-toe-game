import React from "react";

import "./board.css"
import Square from './square.js'

class Board extends React.Component {

    renderSquare(i) {
        let winner = false;
        if (this.props.winnerPosition) {
            winner = this.props.winnerPosition.includes(i) ? true : false;
        }
        return (
            <Square 
              value={this.props.squares[i]}
              completed={this.props.completed}
              winner={winner}
              onClick={() => this.props.onClick(i)} 
            />
        )
    }

    render() {

        return (
            <div>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
    
}

export default Board;
