import React, { useState } from 'react'
import '../css/login.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';


export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [ form, setForm ] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('User Logged In Successfully')
                    dispatch(setUser(data))
                    history.push('/');
                }
            })
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-login flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                                {/* background image set in css */}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>


                                <form onSubmit={handleSubmit} className="form-login">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUsername" className="form-control" placeholder="Username" onChange={handleChange} value={form.username} name="username" required autoFocus />
                                        <label htmlFor="inputUsername">Username</label>
                                    </div>

                                    <hr></hr>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={handleChange} value={form.password} name="password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>

                                    <button className="btn btn-lg button btn-block text-uppercase" type="submit">Sign In</button>
                                    <Link className="d-block text-center mt-2 small" to="/register">New User</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
