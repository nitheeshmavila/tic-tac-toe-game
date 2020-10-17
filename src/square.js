import React from "react";

import "./square.css"

function Square(props) {
    let classname = "square";
    if (props.winner) {
        classname = "winnerSquare";
    }
    return (
        <button className={classname}
            onClick={() => props.onClick()}
            disabled={props.completed}>
            {props.value}
        </button>
    )
}

export default Square;