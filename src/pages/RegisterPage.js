import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const RegisterPage = () => {
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [cpassword,setcPassword]=useState("")
  return (
    <div className='register-parent'>
      <div className='register-top'></div>
      <div className='row justify-content-center'>
          <div className='col-md-5'>
          <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_yr6zz3wv.json"  background="transparent"  speed="1" loop  autoplay></lottie-player>
          </div>
          <div className='col-md-4'>
            <div className='register-form'>
                 
                <h2>Register</h2>
                <hr/>
                <input type="text" className='form-control' placeholder="email" onClick={(e)=>setEmail(e.target.value)}/>
                <hr/>
                <input type="password" className='form-control' placeholder="password" onClick={(e)=>setPassword(e.target.value)}/>
                <hr/>
                <input type="password" className='form-control' placeholder="confirm password" onClick={(e)=>setcPassword(e.target.value) }/>

                <button className='my-3'>Register</button>
                <hr/>
                <Link to="/login">Click Here To Login</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default RegisterPage
