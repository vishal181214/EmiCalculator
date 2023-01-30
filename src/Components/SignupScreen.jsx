import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignupScreen() {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth)
      navigate('/calculateEmi')
  })

  const registerUser = async () =>{
    if (name === '' || email === '' || password === '') {
      toast.error("Sorry! You Missed Something")
    }
    else{
      try {
        const data = await axios.post('http://localhost:4500/home/signup', {
          name,
          email,
          password,
        });
        if (data) {
          toast.success("User Register Successfully");
          localStorage.setItem("user", JSON.stringify(data));
          navigate('/calculateEmi');
        }
        else {
          toast.error("emailId already exist");
        }
      } catch (error) {
        toast.error("emailId Already Exist");
      }
    }
  }
  return (
    <div className='HomeMainDiv'>
    <div className='formDiv'>
      <h4 className='mainLabel'>Register Yourself</h4>
      <div className='inputGroup'>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className='inputBox' placeholder='Enter Your Name' />
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className='inputBox' placeholder='Enter Your Email' />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='inputBox' placeholder='Enter your Password' />
          <button className='bttn btnlogin' onClick={registerUser}>Register</button>
          <span className='createInfo'>
              Have an account ! &nbsp;
              <Link to='/login' className='createNewBn' alt=''>LogIn</Link>
          </span>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default SignupScreen