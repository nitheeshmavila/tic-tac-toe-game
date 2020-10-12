import React from "react";
import ReactDOM from "react-dom";

import './game.css';
import Board from './board.js';

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Board/>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);