import React, { useEffect, useState } from 'react'
import db from '../appwrite/database'
import PostCard from '../components/PostCard'
import Container from '../components/container/Container'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const getPosts = async () => {
    try {
      const result = await db.getAllPosts()
      setPosts(result.documents)
    } catch (error) {
      console.error("Home :: getAllPosts :: error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      <Container>
        {posts.length > 0 && !loading ? (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard id={post.$id} key={post.$id} featuredimage={post.featuredimage} title={post.title} />
            ))}
          </div>
        ) : (
          <h1 className="empty-state">No posts yet</h1>
        )}
      </Container>
    </div>
  )
}

export default Home