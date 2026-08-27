import React from 'react'
import bucket from '../appwrite/storage';
import { Link } from 'react-router-dom'

function PostCard({id,featuredimage,title}) {
  return (
    <Link className="post-card" to={`/post/${id}`}>
     <div className="post-card-image-wrap">
        <img className="post-card-image" src={bucket.getFilePreview({ fileId: featuredimage })} alt={title} />
     </div>
     <h2 className="post-card-title">{title}</h2>
    </Link>
  )
}

export default PostCard