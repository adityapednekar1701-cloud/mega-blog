import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import bucket from '../appwrite/storage';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import db from '../appwrite/database';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RTE from './RTE';

function PostForm({ post }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
   defaultValues: {
    title: post?.title || "",
    slug: post?.$id || "",
    content: post?.content || "",
    status: post?.status || "active",
   }
  });
  const options = ["active", "inactive"];
  const userData = useSelector((state) => {
    return state.auth.userData;
  })
  console.log("PostForm userData:", userData);
  const navigate = useNavigate();
  const slugEditedManually = useRef(false)

  const submit = async (data) => {
    if (post) {
      try {
        if (data.file && data.file.length > 0) {
          const uploadedFile = await bucket.uploadFile({ file: data.file[0] });
          if (uploadedFile) {
            await bucket.deleteFile({ fileId: post.featuredimage });
            const updatedpost = await db.updatePost({ title: data.title, content: data.content, featuredimage: uploadedFile ? uploadedFile.$id : undefined, status: data.status, userid: userData.$id, slug: data.slug })
            navigate(`/post/${updatedpost.$id}`)
          }
        } else {
          const updatedpost = await db.updatePost({ title: data.title, content: data.content, featuredimage: post.featuredimage, status: data.status, userid: userData.$id, slug: data.slug })
          navigate(`/post/${updatedpost.$id}`)
        }
      } catch (error) {
        console.error("editPost error:", error)
        setError(". Please try again.")
      }
    }
    else {
      try {
        const uploadedFile = await bucket.uploadFile({ file: data.file[0] });
        if (uploadedFile) {
          const newPost = await db.createPost({ title: data.title, content: data.content, featuredimage: uploadedFile.$id, status: data.status, userid: userData.$id, slug: data.slug });
          navigate(`/post/${newPost.$id}`)
        }
      } catch (error) {
        console.error("createPost error:", error)
        setError(". Please try again.")
      }
    }
  }

  const convertSlug = useCallback((value) => {
    if (value && typeof (value) === "string") {
      return value.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-")
    }
    return ""
  }, [])

  useEffect(() => {
  if (post) return; // don't auto-generate slug when editing an existing post

  const subscription = watch((value, { name }) => {
    if (name === "title" && !slugEditedManually.current) {
      setValue("slug", convertSlug(value.title), { shouldValidate: true })
    }
  })
  return () => subscription.unsubscribe()
}, [watch, convertSlug, setValue, post])

  return (
    <div>
      {error && <p className="auth-error">{error}</p>}
      <form className="post-form" onSubmit={handleSubmit(submit)}>
        <div className="post-form-main">
          <Input label="Title" placeholder="Title" {...register("title", { required: true })}></Input>
          <Input 
  label="Slug" 
  placeholder="Slug" 
  {...register("slug", { required: true })} 
  onChange={(e) => {
    slugEditedManually.current = true
    setValue("slug", convertSlug(e.target.value), { shouldValidate: true })
  }}
  readOnly={!!post}
/>
          <RTE label="Content" name="content" control={control}></RTE>
        </div>
        <div className="post-form-side">
          <Input label="Featured Image" type="file" {...register("file", {})}></Input>
          <Select label="Status" options={options} {...register("status", { required: true })}></Select>
          <Button type='submit' className='post-form-submit'>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default PostForm