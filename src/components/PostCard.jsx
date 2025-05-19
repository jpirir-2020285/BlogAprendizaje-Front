import React, { useState } from 'react'
import useComments from '../shared/hooks/useComments'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false)
  const [commentToEdit, setCommentToEdit] = useState(null)
  const {
    comments,
    loading,
    error,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment
  } = useComments(post._id)

  const handleEditComment = (comment) => {
    setCommentToEdit(comment)
  }

  const handleCancelEdit = () => {
    setCommentToEdit(null)
  }

  const handleUpdate = async (commentId, updatedData) => {
    await handleUpdateComment(commentId, updatedData)
    setCommentToEdit(null)
  }

  const handleDelete = async (commentId) => {
    await handleDeleteComment(commentId)
    setCommentToEdit(null)
  }

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="mt-2 text-gray-700">{post.description}</p>
      <div className="mt-2 text-sm text-gray-500">
        <span className="mr-4">
          <strong>Curso:</strong> {post.course}
        </span>
        <span>
          <strong>Año:</strong> {new Date(post.dateCreated).getFullYear()}
        </span>
      </div>

      <button
        onClick={() => setShowComments(prev => !prev)}
        className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showComments ? 'Ocultar Comentarios' : 'Ver Comentarios'}
      </button>

      {showComments && (
        <div className="mt-4 space-y-4">
          <CommentForm
            onAddComment={handleAddComment}
            commentToEdit={commentToEdit}
            onUpdateComment={handleUpdate}
            onDeleteComment={handleDelete}
            onCancelEdit={handleCancelEdit}
          />

          {loading && <p className="text-gray-600">Cargando comentarios...</p>}
          {error && <p className="text-red-600">{error}</p>}

          <CommentList
            comments={comments}
            onEditComment={handleEditComment}
            onDeleteComment={handleDelete}
          />
        </div>
      )}
    </div>
  )
}

export default PostCard
