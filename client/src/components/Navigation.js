import React, { useEffect, useState } from 'react'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setUser, toggleTheme } from '../redux/actions';
import '../css/navigation.css'
import DarkModeToggle from 'react-dark-mode-toggle';

export default function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ buttonDisabled, setButtonDisabled ] = useState(false);
    const [ currentUser, setCurrentUser ] = useState([]);
    const [ isDarkMode, setIsDarkMode ] = useState(() => false);

    const logout = () => {
        fetch('/api/v1/users/logout')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setButtonDisabled(true)
                    alert(data.success) 
                    dispatch(setUser(null))
                    history.push('/')
                }
            })
    }

    const handleThemeSwitch = () => {
        dispatch(toggleTheme())
        setIsDarkMode(true)
    }

    useEffect(() => {
        fetch('/api/v1/users/current')
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data)
            })
    }, [])

    return (
        <div className="header">
            <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/">Food Fight</Navbar.Brand>
                {/* <Button onClick={handleThemeSwitch}>Theme Switch</Button> */}
                <DarkModeToggle onChange={(setIsDarkMode, handleThemeSwitch)} checked={isDarkMode} size={80} />
                <Nav>
                {user ? (
                    <Form inline>
                        <Nav.Link as={Link} to={`/team/${user.TeamId}`}>MyTeam</Nav.Link>
                        <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>
                        <Button className="logoutButton" onClick={logout} disabled={buttonDisabled}>Logout</Button>
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
