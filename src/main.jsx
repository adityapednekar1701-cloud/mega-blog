import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import AuthLayout from './components/AuthLayout'
import Home from './pages/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Post from './Pages/Post.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route
        path="login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />

      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />

      <Route
        path="all-posts"
        element={
          <AuthLayout authentication>
            <AllPost />
          </AuthLayout>
        }
      />

      <Route
        path="add-post"
        element={
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        }
      />

      <Route
        path="edit-post/:slug"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />

      <Route path="post/:slug" element={<Post />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)