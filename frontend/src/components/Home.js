import React, { useContext, useEffect } from 'react'
import UserContext from '../context/users/UserContext'
import Alert from './Alert'
import {useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate=useNavigate()
  const context=useContext(UserContext);
  const {user} =context;
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      {user}
    </div>
  )
}


export default Home