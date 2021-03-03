import React from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'

export default function Settings (props) {

    return (
        <div className = "settings-block">
        <DropdownButton id="dropdown-basic-button" onClick = {props.onChangeSpeed}
        title = {props.currentSpeed} className = "dropdown-speed" variant="dark" size="sm">
            <Dropdown.Item > Low </Dropdown.Item>
            <Dropdown.Item >Middle</Dropdown.Item>
            <Dropdown.Item > High </Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" onClick = {props.onChangeLength}
        title = {props.currentLength} variant="dark" size="sm">
            <Dropdown.Item > 2 </Dropdown.Item>
            <Dropdown.Item > 3 </Dropdown.Item>
            <Dropdown.Item > 4 </Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" onClick = {props.onChangeFood}
        title = {props.currentFood} variant="dark" size="sm">
            <Dropdown.Item > apple </Dropdown.Item>
            <Dropdown.Item > banana </Dropdown.Item>
            <Dropdown.Item > strawberry </Dropdown.Item>
        </DropdownButton>
        </div>
        
    )
}