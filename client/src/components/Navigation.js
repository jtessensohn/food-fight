import React, { useState } from 'react'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/actions';
import '../css/Homepage.css'

export default function Navigation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ buttonDisabled, setButtonDisabled ] = useState(false);

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

    return (
        <div>
            <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/">Food Fight</Navbar.Brand>
                <Nav>
                <Form inline>
                    <Button className="registerloginButton" onClick={logout} disabled={buttonDisabled}>Logout</Button>
                </Form>
                </Nav>
            </Navbar>
        </div>
    )
}
