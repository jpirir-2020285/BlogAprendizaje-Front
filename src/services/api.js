import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:1310/v1',
  timeout: 2000,
})

export const getPosts = async () => {
  try {
    const response = await api.get('/post')
    return response.data.posts
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching posts',
      details: error,
    }
  }
}

export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/post/${postId}`)
    return response.data.post
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching post',
      details: error,
    }
  }
}

export const createPost = async (postData) => {
  try {
    const response = await api.post('/post', postData)
    return response.data
  } catch (error) {
    return {
      error: true,
      message: 'Error creating post',
      details: error,
    }
  }
}

export const updatePost = async (postId, updatedData) => {
  try {
    const response = await api.put(`/post/${postId}`, updatedData)
    return response.data
  } catch (error) {
    return {
      error: true,
      message: 'Error updating post',
      details: error,
    }
  }
}

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/post/${postId}`)
    return response.data
  } catch (error) {
    return {
      error: true,
      message: 'Error deleting post',
      details: error,
    }
  }
}

export const getComments = async (postId, limit, skip) => {
  try {
    const response = await api.get('/comment', {
      params: { postId, limit, skip },
    })
    return response.data.commentaries
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching comments',
      details: error,
    }
  }
}

export const addComment = async (commentData) => {
  try {
    const response = await api.post('/comment', commentData)
    return response.data
  } catch (error) {
    return {
      error: true,
      message: 'Error adding comment',
      details: error,
    }
  }
}

export const updateComment = async (commentId, updatedData) => {
  try {
    const response = await api.put(`/comment/${commentId}`, updatedData)
    return response.data
  } catch (error) {
    return {
      error: true,
      message: 'Error updating comment',
      details: error,
    }
  }
}

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/comment/${commentId}`)
    return response.data
  } catch (error) {
    return {
      error: true,
      message: 'Error deleting comment',
      details: error,
    }
  }
}
