// src/shared/hooks/useComments.js
import { useState, useEffect } from 'react'
import {
  getCommentsByPost,
  addComment,
  updateComment,
  deleteComment
} from '../../services/api.js' 

const useComments = (postId) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return

      setLoading(true)
      setError(null)
      try {
        const data = await getCommentsByPost(postId)
        if (data.error) {
          setComments([])
          setError(data.message)
        } else {
          setComments(data)
        }
      } catch {
        setError('Error al cargar comentarios')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [postId])

  const handleAddComment = async (name, content) => {
    try {
      const res = await addComment({ name, content, post: postId })
      if (!res.error) {
        setComments((prev) => [...prev, res.commentary])
      } else {
        setError(res.message)
      }
    } catch {
      setError('Error al agregar comentario')
    }
  }

  const handleUpdateComment = async (commentId, updatedData) => {
    try {
      const res = await updateComment(commentId, updatedData)
      if (!res.error) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === res.commentary._id ? res.commentary : c
          )
        )
      } else {
        setError(res.message)
      }
    } catch {
      setError('Error al actualizar comentario')
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteComment(commentId)
      if (!res.error) {
        setComments((prev) =>
          prev.filter((c) => c._id !== commentId)
        )
      } else {
        setError(res.message)
      }
    } catch {
      setError('Error al eliminar comentario')
    }
  }

  return {
    comments,
    loading,
    error,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment
  }
}

export default useComments
