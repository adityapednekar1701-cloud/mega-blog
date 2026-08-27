import React, { useEffect, useState } from 'react'
import db from '../appwrite/database';
import bucket from '../appwrite/storage';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'
import Container from '../components/container/Container'
import Button from '../components/Button'

function Post() {

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userid === userData.$id : false

  const getPost = async () => {
    try {
      const result = await db.getPost({ slug })
      setPost(result)
    } catch (error) {
      console.error("Post :: getPost :: error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPost();
  }, [slug])

  const deletePost = async () => {
    try {
      const status = await db.deletePost({ slug })
      if (status) {
        await bucket.deleteFile({ fileId: post.featuredimage })
        navigate("/")
      }
    } catch (error) {
      console.error("Post :: deletePost :: error", error)
    }
  }

  return (
    <div>
      <Container>
        {!loading ? (
          Object.keys(post).length > 0 ? (
            <div className="post-page">
              <div className="post-page-image-wrap">
                <img
                  className="post-page-image"
                  src={bucket.getFilePreview({ fileId: post.featuredimage })}
                  alt={post.title}
                />
              </div>

              {isAuthor && (
                <div className="post-page-actions">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="#16a34a">Edit</Button>
                  </Link>
                  <Button bgColor="#dc2626" onClick={deletePost}>Delete</Button>
                </div>
              )}

              <h1 className="post-page-title">{post.title}</h1>
              <div className="post-page-content">{parse(post.content)}</div>
            </div>
          ) : (
            <h1 className="empty-state">Post not found</h1>
          )
        ) : (
          <h1 className="empty-state">Loading...</h1>
        )}
      </Container>
    </div>
  )
}

export default Post