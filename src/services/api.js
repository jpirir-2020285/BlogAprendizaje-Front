// src/api.js
import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:1310/v1',
  timeout: 2000,
})

export const getPosts = async () => {
  try {
    const res = await api.get('/post')
    return res.data.posts
  } catch (error) {
    toast.error('Error al obtener publicaciones')
    return { error: true, message: 'Error fetching posts', details: error }
  }
}

export const getPostsByCourse = async (course) => {
  try {
    const res = await api.get(`/post/course/${course}`)
    return res.data
  } catch (error) {
    toast.error(`Error al filtrar por curso: ${course}`)
    return { error: true, message: 'Error fetching posts by course', details: error }
  }
}

// Trae posts filtrados por año (2023, 2024, 2025…)
export const getPostsByYear = async (year) => {
  try {
    const res = await api.get(`/post/year/${year}`)
    return res.data
  } catch (error) {
    toast.error(`Error al filtrar por año: ${year}`)
    return { error: true, message: 'Error fetching posts by year', details: error }
  }
}

// Crea, actualiza y borra...
export const createPost = async (data) => {
  try {
    const res = await api.post('/post', data)
    return res.data
  } catch (error) {
    toast.error('Error al crear publicación')
    return { error: true, message: 'Error creating post', details: error }
  }
}

export const updatePost = async (id, data) => {
  try {
    const res = await api.put(`/post/${id}`, data)
    return res.data
  } catch (error) {
    toast.error('Error al actualizar publicación')
    return { error: true, message: 'Error updating post', details: error }
  }
}

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/post/${id}`)
    return res.data
  } catch (error) {
    toast.error('Error al eliminar publicación')
    return { error: true, message: 'Error deleting post', details: error }
  }
}

export const getCommentsByPost = async (postId) => {
  try {
    const res = await api.get(`/comment/comments/${postId}`)
    return res.data.comments
  } catch (error) {
    toast.error('Error al obtener comentarios')
    return { error: true, message: 'Error fetching comments', details: error }
  }
}

export const addComment = async (data) => {
  try {
    const res = await api.post('/comment', data)
    return res.data
  } catch (error) {
    toast.error('Error al agregar comentario')
    return { error: true, message: 'Error adding comment', details: error }
  }
}

export const updateComment = async (id, data) => {
  try {
    const res = await api.put(`/comment/${id}`, data)
    return res.data
  } catch (error) {
    toast.error('Error al actualizar comentario')
    return { error: true, message: 'Error updating comment', details: error }
  }
}

export const deleteComment = async (id) => {
  try {
    const res = await api.delete(`/comment/${id}`)
    return res.data
  } catch (error) {
    toast.error('Error al eliminar comentario')
    return { error: true, message: 'Error deleting comment', details: error }
  }
}
