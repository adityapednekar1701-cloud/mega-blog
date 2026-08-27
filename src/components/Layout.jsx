import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import authService from '../appwrite/auth'
import { login, logout } from '../store/authSlice'

function Layout() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error("Layout :: fetch user error", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return !loading ? (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default Layout