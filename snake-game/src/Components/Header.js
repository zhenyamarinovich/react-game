import React from 'react';
import {Navbar} from 'react-bootstrap';
import logo from '../assets/img/head.jpg';

export default (props) => {
    return (
       <>
         <Navbar bg="dark" variant="dark" className="header-block">
            <Navbar.Brand href="#home">
            <img
                alt=""
                src= {logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Snake Game
            </Navbar.Brand>
        </Navbar>
       </>
    )
}