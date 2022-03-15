import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

  return (
    <div className='login-parent'>
      
      <div className='row justify-content-center'>
      <div className='col-md-4'>
            <div className='login-form'>
                 
                <h2>Login</h2>
                <hr/>
                <input type="text" className='form-control' placeholder="email" onClick={(e)=>setEmail(e.target.value)}/>
                <hr/>
                <input type="password" className='form-control' placeholder="password" onClick={(e)=>setPassword(e.target.value)}/>
                <hr/>
               

                <button className='my-3'>Login</button>
                <hr/>
                <Link to="/register">Click Here To Register</Link>
            </div>
          </div>
          <div className='col-md-5'>
          <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_yr6zz3wv.json"  background="transparent"  speed="1" loop  autoplay></lottie-player>
          </div>
          
      </div>
      <div className='login-bottom'></div>
      <hr/>
      
    </div>
  )
}

export default LoginPage

