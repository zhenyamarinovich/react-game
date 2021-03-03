import React from 'react'
import {Form} from 'react-bootstrap'
import sound from '../assets/img/sound.svg'
import unsound from '../assets/img/unsound.svg'

export default function StartGame (props) {

    return (
    <Form>
        <Form.Group controlId="formBasicRange">
            <Form.Label onClick = {props.onMuteSound}>
                <span>Sound volume</span>
                <img src={sound} alt = "volume" className="sound-image"/>
                <img src={unsound} alt = "volume" className="sound-image image-none"/>
            </Form.Label>
            <Form.Control type="range" min="0" max="1" step="0.01" onChange = {props.onChangeSoundVolume}/>
            <Form.Label onClick = {props.onMuteMusic}>
                <span>Music volume</span>
                <img src={sound} alt = "volume" className="sound-image" />
                <img src={unsound} alt = "volume" className="sound-image image-none"/>
            </Form.Label>
            <Form.Control type="range" min="0" max="1" step="0.01" onChange = {props.onChangeMusicVolume}/>
        </Form.Group>
    </Form>
    )
}