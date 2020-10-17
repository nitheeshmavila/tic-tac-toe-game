import React from "react";

import "./board.css"
import Square from './square.js'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true,
            completed: false
        };
    }

    handleClick(i) {
        let squares = this.state.squares.slice();
        if (this.hasEntry(squares, i)) return;

        squares[i] = this.state.xIsNext ? "X" : "0";
        let completed = false;

        if (this.calculateWinnerPosition(squares) || this.checkAllFilled(squares)) {
            completed = true;
        }
        this.setState(
            {squares: squares,
            xIsNext: !this.state.xIsNext,
            completed: completed
        });
    }

    startGame() {        
        this.setState(
            {squares: Array(9).fill(null),
            xIsNext: true,
            completed: false
        });
    }


    checkAllFilled(sqaures){
        return !sqaures.includes(null);
    }
    
    hasEntry(sqaures, i) {
        return sqaures[i]; 
    }

    renderSquare(i) {
        const winnerPosition = this.calculateWinnerPosition(this.state.squares);
        let winner = false;
        if (winnerPosition && winnerPosition.includes(i)) {
            winner = true;
        }
        return (
            <Square 
              value={this.state.squares[i]}
              completed={this.state.completed}
              winner={winner}
              onClick={() => this.handleClick(i)} 
            />
        )
    }

    getWinner(squares, winnerPosition) {
        return squares[winnerPosition[0]];
    }
    
    calculateWinnerPosition(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        for (let i=0; i<lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] != null && squares[b] != null && squares[c] != null) {
                if (squares[a] === squares[b] && squares[a] === squares[c]) {
                    return [a, b, c];
                }
            }
        }
        return null;
    }

    renderClearButton() {
        if (this.state.completed) {
            return (
                <button className="refreshBtn"
                onClick={() => this.startGame()}>clear</button>
            )
        }
    }

    render() {
        const winnerPosition = this.calculateWinnerPosition(this.state.squares);
        let winner = null;
        if (winnerPosition) {
            winner = this.getWinner(this.state.squares, winnerPosition);
        }
        let status;
        if (winner) {
            status = winner + " won the game!";
        } else if (this.state.completed){
            status = "Game Over";
        } else {
            status = "Next player is " + (this.state.xIsNext ? 'X' : '0');
        }
        return (
            <div className="gameBoard">
                <div className="gameTitle">Tic Tac Toe
                </div>
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
                <div className="status">{status}</div>
                {this.renderClearButton()}
            </div>
        );
    }
    
}

export default Board;
