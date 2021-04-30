import React, { useEffect, useState } from 'react'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setUser, toggleTheme } from '../redux/actions';
import '../css/navigation.css'
import DarkModeToggle from 'react-dark-mode-toggle';
import nameLogo from "../images/nameLogo.png"
import BurgerBoxer from './BurgerBoxer';

export default function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ currentUser, setCurrentUser ] = useState([]);
    const [ isDarkMode, setIsDarkMode ] = useState(() => false);

    const logout = () => {
        fetch('/api/v1/users/logout')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(setUser(null))
                    history.push('/')
                }
            })
    }

    const handleThemeSwitch = () => {
        dispatch(toggleTheme())
        if (isDarkMode === true) {
            setIsDarkMode(false)
        } else {
            setIsDarkMode(true)
        }
    }

    useEffect(() => {
        fetch('/api/v1/users/current')
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data)
            })
    }, [user, history])

    return (
        <div className="header navbarContainer">
            <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/" className="nameLogoLink"><img src={nameLogo} alt="Logo"></img></Navbar.Brand>
                <div style={{marginRight: "auto"}}>
                <BurgerBoxer gloveColor="red" />
                <BurgerBoxer gloveColor="blue" opposite={true} />
                </div>

                <DarkModeToggle onChange={(setIsDarkMode, handleThemeSwitch)} checked={isDarkMode} size={80}/>
                <Nav>
                {user ? (

                    <Form className="navbarForm" inline>
                        <Nav.Link as={Link} to={`/team/${currentUser.TeamId}`}>My Team</Nav.Link>
                        <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>
                        <Button className="logoutButton" onClick={logout}>Logout</Button>
                    </Form>
                ) : (
                    <>
                    </>
                )}
                </Nav>
            </Navbar>
        </div>
    )
}
