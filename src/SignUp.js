import React from 'react'
import {useNavigate} from "react-router-dom"

const SignUp = () => {
    const navigate = useNavigate();

  return (
    <div className='head'>
        <div className='loginform'>
    <h2 className='headerTitle'>Sign up</h2>
    <div class="signUpPage">
      <label>User name</label>
      <input  placeholder="Enter user name" type="text" />
      <label>Email id</label>
      <input description="Mail" placeholder="Enter your email" type="text" />
      <label>Password</label>
      <input placeholder="Enter password" type="password" />
      <label>Confirm password</label>
      <input placeholder="Re-enter password" type="password" />
      <div >Already a member? <span className='link' onClick={() => navigate("/")}>Login</span></div>
      <button>Sign up</button>
      
    </div>
  </div>
  </div>
  )
}

export default SignUp