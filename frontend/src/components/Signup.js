import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/users/UserContext'

const Signup = () => {
    const context=useContext(UserContext);
  const {signup,getUser} =context;
    const [note, setnote] = useState({ name:"",email: "", password: "",cpassword:"" });
    const navigate=useNavigate()

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const handlerSubmit = async (e) => {
        e.preventDefault()        
        const json= await signup({name:note.name,email:note.email,password:note.password})
        console.log(json)
        if (json.sucess) {
            localStorage.setItem('token', json.authToken)
            getUser()
            navigate("/")
        }
        else { alert(json.errors) }
    }


    return (
        <>
            <div className="container">
                <div className="card login-card">
                    <div className="row no-gutters">
                        <div className="col-md-5">
                            <img src="https://source.unsplash.com/random/400x300" width="304" height="236" alt="login" className="login-card-img https://source.unsplash.com/random/400x300" />
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
                                    <div className="form-group mb-1">
                                        <label htmlFor="username" className="sr-only">Username</label>
                                        <input type="text" name="name" id="username" className="form-control" placeholder="Name" onChange={onChange} />
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Email address" onChange={onChange}/>
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="***********" onChange={onChange}/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="cpassword" className="sr-only">Password</label>
                                        <input type="password" name="cpassword" id="cpassword" className="form-control" placeholder="***********" onChange={onChange}/>
                                    </div>

                                    <button className="btn btn-primary" type="submit">Signup</button>
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

export default Signup