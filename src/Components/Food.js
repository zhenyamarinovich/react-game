import React from 'react';
import apple from '../assets/img/apple.png';
import banana from '../assets/img/banana.png';
import strawberry from '../assets/img/strawberry.png';

export default function Food (props) {

    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`,
    }

    if(props.nameFood === "apple"){
        return (
            <img src = {apple} style = {style} className = "snake-food" alt="apple"/>
        )
    } else if(props.nameFood === "banana") {
        return (
            <img src = {banana} style = {style} className = "snake-food" alt="banana"/>
        )
    } else {
        return (
            <img src = {strawberry} style = {style} className = "snake-food" alt="strawberry"/>
        )
    }
}