import React from 'react'
import Logo from '../images/Logo.png'
import '../css/Homepage.css'
import { Nav, Navbar, Button } from 'react-bootstrap';

export default function Home() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
                <Navbar.Brand href="#home">Food Fight</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar>
            <img className="logo" src={Logo} alt='Food-fight-logo.png'></img>
            <h2>Welcome to Food Fight!</h2>
            <p>oh boy im about to crumb</p>
            <Button className="registerloginButton" >Register</Button>
            <Button className="registerloginButton">Login</Button>
        </div>
    )
}
