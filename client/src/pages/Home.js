import React from 'react'
import Logo from '../images/Logo.png'
import '../css/Homepage.css'
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Home() {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
                <Navbar.Brand href="#home">Food Fight</Navbar.Brand>
                {/* <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav> */}
            </Navbar>
            <img className="logo" src={Logo} alt='Food-fight-logo.png'></img>
            <h2>Welcome to Food Fight!</h2>
            <p>Tired of Jim always choosing lunch?  <br/>Does Sally always know the best foods…but not really?<br/>
                  Let’s fight about it!  Who ever said fights have to be bad? <br/> Here on Food Fight,You now have just as much say in as Jim or sally on what you get to eat for lunch<br/>
                we make it fun to go into battle for YOUR choice in restaurants. <br/> You now have just as much say in as Jim or sally on what you get to eat for lunch</p>

            {user ? (
                <>
                    <Button className="registerloginButton" as={Link} to="/register" >idk what</Button>
                    <Button  as={Link} to="/login" className="registerloginButton">crumb is</Button>
                </>
            ) : (
                <>
                    <Button className="registerloginButton" as={Link} to="/register" >Register</Button>
                    <Button  as={Link} to="/login" className="registerloginButton">Login</Button>
                </>
            )}
        </div>
    )
}
