import React from 'react'
import { useState } from "react";
import '../css/register.css'
import { Link, useHistory } from 'react-router-dom'

export default function Register() {
    const history = useHistory()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log("submitted")
        fetch('api/v1/users/register', {
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
                    alert('User Registered successfully')
                    history.push('/login')
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
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-9 mx-auto">
                            <div className="card card-login flex-row my-5">
                                <div className="card-img-left d-none d-md-flex ">
                                    {/* background image set in css */}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-center">Register</h5>


                                    <form className="form-login" onSubmit={handleSubmit}>
                                        <div className="form-label-group">
                                            <input onChange={handleChange} type="text" id="inputUsername" className="form-control" placeholder="Username" value={form.username} name="username" required autoFocus />
                                            <label htmlFor="inputUsername">Username</label>
                                        </div>

                                        <hr></hr>

                                        <div className="form-label-group">
                                            <input onChange={handleChange} type="password" id="inputPassword" className="form-control" placeholder="Password" value={form.password} name="password" required />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>


                                        {/* add later to check to see if the passwords match */}
                                        {/* <div className="form-label-group">
                                        <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required />
                                        <label for="inputConfirmPassword">Confirm password</label>
                                    </div> */}

                                        <button className="btn btn-lg button btn-block mb-3 text-uppercase" type="submit">Register</button>
                                    </form>
                                    <div class="card-footer small ">
                                        Already a fighter?
                                    <Link className="d-block text-center mt-2 " to="/login">Sign In</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
