import React from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'

export default function Settings (props) {

    return (
        <DropdownButton id="dropdown-basic-button" onClick = {props.onChangeSpeed}
        title = {props.currentSpeed} className = "dropdown-speed" variant="dark" size="sm">
            <Dropdown.Item > Low </Dropdown.Item>
            <Dropdown.Item >Middle</Dropdown.Item>
            <Dropdown.Item > High </Dropdown.Item>
        </DropdownButton>
    )
}