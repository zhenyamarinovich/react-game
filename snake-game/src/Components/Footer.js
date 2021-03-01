import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import gitImage from '../assets/img/git.png';
import rsImage from '../assets/img/rs_school_js.svg';

export default (props) => {
    return (
        <>
            <Navbar bg="dark" variant="dark" className="footer-block">
                <Nav className="m-auto">
                <Navbar>Create by Zhenya Marinovich 2020</Navbar>
                <Nav.Link href="https://github.com/zhenyamarinovich">
                    <img src= {gitImage} className = "footer_git-image"/>
                </Nav.Link>
                <Nav.Link href="https://rs.school/">
                    <img src= {rsImage} className = "footer_git-image"/>
                </Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}
