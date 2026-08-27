import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import Input from './Input';
import Button from './Button';
import Logo from './Logo';
import { Link } from 'react-router-dom';

function SignUp() {

  const [error,setError] = useState("");
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const {register,handleSubmit} = useForm();  
  const signup= async (data)=>{
          try {
            setError(""); 
            const user = await authService.createAccount(data);
            if(user)
            {
               const userData = await authService.getCurrentUser();
               if(userData)
               { 
                dispatch(login(user));
                navigate("/");
               } 
            }    
          } catch (error) {
             console.error("SignUp error:", error)
             setError("Unable to create account. Please try again.")
          }
  } 

  return (
    <div className="auth-wrapper">
       <div className="auth-card">
          <div className="auth-logo">
            <Logo width='100px'></Logo>
          </div>
          <h2 className="auth-title">Create a new account</h2>
          <p className="auth-subtext">Already have an account?&nbsp;<Link to="/login">Sign In</Link></p>
          {error && <p className="auth-error">{error}</p>}
          <form onSubmit={handleSubmit(signup)}>
            <div>
              <Input label="Name" placeholder="Enter your Name" type="text" {...register("name",{required:true})}></Input>  
              <Input label="Email" placeholder="Enter your email" type="email" {...register("email",{required: true,validate: {matchPatern: (value) => {return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address";}}})}></Input>
              <Input label="Password" placeholder="Enter your password" type="password" {...register("password",{required:true})}></Input>
              <Button type='submit' className='auth-submit'>Create Account</Button>
            </div>
          </form>
       </div>
    </div>
  )
}

export default SignUp