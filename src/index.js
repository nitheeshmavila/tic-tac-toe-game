import React from "react";
import ReactDOM from "react-dom";

import './game.css';
import Board from './board.js';

class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          xIsNext: true,
          completed: false
        };
    }

    startGame() {        
        this.setState({
            history: [{
                squares: Array(9).fill(null),
              }],
              xIsNext: true,
              completed: false
        });
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
                onClick={() => this.startGame()}>Play again</button>
            )
        }
    }

    getWinner(squares, winnerPosition) {
        return squares[winnerPosition[0]];
    }

    hasEntry(sqaures, i) {
        return sqaures[i]; 
    }

    checkAllFilled(sqaures){
        return !sqaures.includes(null);
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.hasEntry(squares, i)) return;

        squares[i] = this.state.xIsNext ? "X" : "0";
        let completed = false;

        if (this.calculateWinnerPosition(squares) || this.checkAllFilled(squares)) {
            completed = true;
        }
        this.setState(
            { history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext,
            completed: completed
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length -1];
        const winnerPosition = this.calculateWinnerPosition(current.squares);
        let winner = null;
        if (winnerPosition) {
            winner = this.getWinner(current.squares, winnerPosition);
        }
        let status;
        if (winner) {
            status = winner + " won the game!";
        } else if (this.state.completed){
            status = "Game tied!";
        } else {
            status = "Next player is " + (this.state.xIsNext ? 'X' : '0');
        }
        return (
            <div className="game">
                <div className="gameTitle">Tic Tac Toe</div>
                <div className="gameBoard">
                 <Board
                    squares={current.squares}
                    completed={this.state.completed}
                    xIsNext={this.state.xIsNext}
                    onClick={(i) => this.handleClick(i)}
                    winnerPosition={winnerPosition}
                 />
                </div>
                <div class="gameDetails">
                    <div className="status">{status}</div>
                    {this.renderClearButton()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);