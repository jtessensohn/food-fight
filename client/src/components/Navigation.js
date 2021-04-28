import React, { useEffect, useState } from 'react'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/actions';
import '../css/navigation.css'

export default function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ currentUser, setCurrentUser ] = useState([]);

    const logout = () => {
        fetch('/api/v1/users/logout')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.success) 
                    dispatch(setUser(null))
                    history.push('/')
                }
            })
        }
        
        useEffect(() => {
            fetch('/api/v1/users/current')
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data)
            })
    }, [user, history])

    return (
        <div className="navbarContainer">
            <Navbar bg="" variant="light" className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/">Food Fight</Navbar.Brand>
                <Nav>
                {user ? (
                    <Form inline>
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
