import React from 'react'
import {Button} from 'react-bootstrap'

export default function StartGame (props) {

    return (
        <>
            <Button variant="dark" onClick = {props.onClickNewGame}>Start Game</Button>{' '}
        </>
    )
}