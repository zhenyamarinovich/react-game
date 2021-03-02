import React from 'react';
import head from '../assets/img/head.png';
import body from '../assets/img/body.png';

export default function Snake(props) {
    return (
        <div className = "snake-body">
            {props.snakeDots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                }
                if (i === props.snakeDots.length - 1 ) {
                    return (
                        //<div className = "snake-head snake-dot" key={i} style = {style}></div>
                        <img src = {head} key={i} style = {style} className = "snake-head snake-dot" alt="snake-head"/>
                    )
                }
                return (
                    //<div className = "snake-dot" key={i} style = {style}></div>
                    <img src = {body} key={i} style = {style} className = "snake-dot" alt="snake-body"/>
                )
            })}
        </div>
    )
}