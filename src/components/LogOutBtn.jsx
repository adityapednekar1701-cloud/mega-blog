import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice';

function LogOutBtn() {

  const dispatch = useDispatch();

  const handleLogout = ()=>{
    authService.logout().then(()=>{
        dispatch(logout());
    }).catch((error)=>{
        console.error("App :: logout user error", error);
    })
  }

  return (
      <button className="btn" onClick={handleLogout}>LogOut</button>
  )
}

export default LogOutBtn
