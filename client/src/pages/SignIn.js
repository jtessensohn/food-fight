import React from 'react'
import '../css/signIn.css'
import { Link } from 'react-router-dom'


export default function SignIn() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                                {/* background image set in css */}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>


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
