import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import db from '../appwrite/database'
import PostForm from '../components/PostForm'
import Container from '../components/container/Container'

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const getPost = async () => {
    try {
      const result = await db.getPost({ slug })
      if (result) {
        if (result.userid === userData?.$id) {
          setPost(result)
        } else {
          navigate("/")
        }
      } else {
        navigate("/")
      }
    } catch (error) {
      console.error("EditPost :: getPost :: error", error)
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPost()
  }, [slug])

  return (
    <div>
      <Container>
        {!loading ? (
          post ? <PostForm post={post} /> : null
        ) : (
          <h1 className="empty-state">Loading...</h1>
        )}
      </Container>
    </div>
  )
}

export default EditPost