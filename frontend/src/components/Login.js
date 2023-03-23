import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/users/UserContext'

const Login = () => {
    const context = useContext(UserContext);
    const { login, getUser } = context;
    const [note, setnote] = useState({ email: "", password: "" });
    let navigate = useNavigate()

    const handlerSubmit = async (e) => {
        e.preventDefault()
        const json = await login({ email: note.email, password: note.password });
        if (json.sucess) {
            localStorage.setItem('token', json.authToken)
            getUser()
            navigate("/")
        }
        else { alert(json.errors) }
    }
    const onChanges = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <div className="card login-card">
                    <div className="row no-gutters">
                        <div className="col-md-5">
                            <img src="https://source.unsplash.com/random/400x300" alt="login" className="login-card-img https://source.unsplash.com/random/400x300" />
                            <p className="text-white font-weight-medium text-center flex-grow align-self-end footer-link text-small">
                                Free <Link to="https://wordpress-923989-3206731.cloudwaysapps.com/" target="_blank" className="text-white">Bootstrap dashboard templates</Link> from Bootstrapdash
                            </p>
                        </div>
                        <div className="col-md-5">
                            <div className="card-body">
                                <div className="brand-wrapper">
                                    <i className="fa-solid fa-user fa-2xl"></i>
                                </div>
                                <p className="login-card-description">Sign into your account</p>
                                <form onSubmit={handlerSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" onChange={onChanges} placeholder="Email address" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="***********" onChange={onChanges} />
                                    </div>
                                    <button className="btn btn-primary" type="submit" >Login</button>

                                </form>
                                <Link to="#!" className="forgot-password-link">Forgot password?</Link>
                                <p className="login-card-footer-text">Don't have an account? <Link to="/signup" className="text-reset">Sign Up</Link></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Login