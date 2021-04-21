import React from 'react'
// import { useState } from "react";
import '../css/register.css'
import { Link } from 'react-router-dom'

// const [ form, setForm ] = useState({
//         username: '',
//         password: ''
//     })
//     const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("submitted")
        fetch('api/v1/users/register', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                // username: form.username,
                // password: form.password
            })
        })
            .then(res => res.json())
            .then(data =>  {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('User Registered successfully')
                    // history.push('/login')
                }
            })
    }

    const handleChange = (event) => {
        // event.target.value
        // setForm({
        //     ...form,
        //     [event.target.name] : event.target.value
        // })
    }

export default function Register() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex ">
                                {/* background image set in css */}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>


                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserame" className="form-control" placeholder="Username" required autoFocus />
                                        <label htmlFor="inputUserame">Username</label>
                                    </div>

                                    <hr></hr>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>


                                    {/* add later to check to see if the passwords match */}
                                    {/* <div className="form-label-group">
                                        <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required />
                                        <label for="inputConfirmPassword">Confirm password</label>
                                    </div> */}

                                    <button className="btn btn-lg button btn-block text-uppercase" type="submit">Register</button>
                                    <Link className="d-block text-center mt-2 small" to="/signIn">Sign In</Link>
                                </form>
                                <div class="card-footer ">
                                Hurry! If you don't join your team, or who knows where you'll be eating.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
