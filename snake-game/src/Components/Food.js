import React from 'react';
import apple from '../assets/img/apple.png';

export default (props) => {

    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`,
    }

    return (
        //<div className = "snake-food" style = {style}></div>
        <img src = {apple} style = {style} className = "snake-food"/>
    )
}