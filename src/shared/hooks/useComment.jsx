import { useState, useEffect } from 'react'
import {
  getCommentsByPost,
  addComment,
  updateComment,
  deleteComment
} from '../../services/api.js' 

const useComments = (postId) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!postId) return

    const fetchComments = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetched = await getCommentsByPost(postId)
        setComments(fetched)
      } catch (err) {
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
        throw new Error(res.message)
      }
    } catch {
      setError('Error al agregar comentario')
    }
  }

  const handleUpdateComment = async (id, data) => {
    try {
      const res = await updateComment(id, data)
      if (!res.error) {
        setComments((prev) =>
          prev.map((c) => (c._id === res.commentary._id ? res.commentary : c))
        )
      } else {
        throw new Error(res.message)
      }
    } catch {
      setError('Error al actualizar comentario')
    }
  }

  const handleDeleteComment = async (id) => {
    try {
      const res = await deleteComment(id)
      if (!res.error) {
        setComments((prev) => prev.filter((c) => c._id !== id))
      } else {
        throw new Error(res.message)
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