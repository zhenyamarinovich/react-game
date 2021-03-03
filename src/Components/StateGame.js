import React from 'react'
import lastTen from '../assets/img/lastTen.png'

export default function StateGame (props) {
    return (
        <span>
            Score: {props.currentLength}. &nbsp;
            Tail length:  {props.tail}. &nbsp;
            <img src = {lastTen} alt="last 10 score" onClick = {props.statistics} className = "score-image"/> &nbsp;
            Use &#8593; &#8594; &#8595; &#8592; to move snake.
        </span> 
    )
}