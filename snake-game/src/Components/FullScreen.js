import React from 'react'
import {Button} from 'react-bootstrap'

export default function FullScreen (props) {

    return (
        <>
            <Button variant="dark" onClick={props.onFullScreen}>FullScreen</Button>{' '}
        </>
    )
}