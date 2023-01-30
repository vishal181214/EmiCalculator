import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation';
function LoginScreen() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  const logIn = async() =>{
    try {
      const data = await axios.post('http://localhost:4500/home/login',{
        email,
        password,
      });
      if(data){
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("User LogIn Sucessfull");
        navigate('/emicalculator');
      }
      
    } catch (error) {
      toast.error("Invalid email or password");
    }
    setEmail('');
    setPassword('');
  }

  return (
  <>
    <Navigation/>
    <div className='HomeMainDiv'>
    <div className='formDiv'>
      <h4 className='mainLabel'>LogIn</h4>
      <div className='inputGroup'>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className='inputBox' placeholder='UserName' />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='inputBox' placeholder='Password' />
          <button className='bttn btnlogin' onClick={logIn}>LogIn</button>
          <span className='createInfo'>
              Not Registered ! &nbsp;
              <Link to='/signup' className='createNewBn' alt=''>Create Account</Link>
          </span>
      </div>
    </div>
    <ToastContainer />
  </div>
  </>
  )
}

export default LoginScreen