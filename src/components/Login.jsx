import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth';
import {useForm} from 'react-hook-form'
import { login as authLogin } from '../store/authSlice';
import Button from './Button';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';

function Login() {
  const dispatch = useDispatch();
  const {register,handleSubmit} = useForm();
  const [error,setError]= useState("");
  const navigate = useNavigate();

  const login = async(data)=>{
      setError("");
      try {
        const session = await authService.login(data);
        if(session)
        {
            const userData = await authService.getCurrentUser();
            if(userData)
            {
                dispatch(authLogin(userData));
                navigate("/");
            }    
        }
      } catch (error) {
        console.error("Login error:", error)
        setError("Invalid email or password. Please try again.")
      }
  }

  return (
    <div className="auth-wrapper">
        <div className="auth-card">
            <div className="auth-logo">
                <Logo width='100px'></Logo>
            </div>
            <h2 className="auth-title">Sign in to your account</h2>
            <p className="auth-subtext">Don&apos;t have any account?&nbsp;<Link to="/signup">Sign Up</Link></p>
            {error && <p className="auth-error">{error}</p>}
            <form onSubmit={handleSubmit(login)}>
               <div>
                  <Input label="Email" placeholder="Enter your email" type="email" {...register("email",{required: true,validate: {matchPatern: (value) => {return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address";}}})}></Input>
                  <Input label="Password" placeholder="Enter your password" type="password" {...register("password",{required:true})}></Input>
                  <Button type='submit' className='auth-submit'>Sign In</Button>
               </div> 
            </form>
        </div>
    </div>
  )
}

export default Login