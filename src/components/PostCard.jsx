import React, { useState } from 'react'
import useComments from '../shared/hooks/useComment.jsx'
import CommentForm from './CommentForm.jsx'
import CommentList from './CommentList.jsx'

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

  const toggleComments = () => {
    setShowComments(v => !v)
    setCommentToEdit(null)
  }

  return (
    <div className="card h-100 border-2 border-primary rounded-3 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary fw-semibold">
          {post.title}
        </h5>

        <p className="card-text flex-grow-1">{post.description}</p>

        <ul className="list-inline text-muted small mb-3">
          <li className="list-inline-item">
            <strong>Curso:</strong> {post.course}
          </li>
          <li className="list-inline-item">
            <strong>Año:</strong>{' '}
            {new Date(post.dateCreated).getFullYear()}
          </li>
        </ul>

        <button
          className="btn btn-primary mb-3"
          onClick={toggleComments}
        >
          {showComments ? 'Ocultar comentarios' : 'Ver comentarios'}
        </button>

        {showComments && (
          <div className="mt-auto">
            {loading && <p className="text-secondary">Cargando…</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <CommentList
              comments={comments}
              onEditComment={c => setCommentToEdit(c)}
              onDeleteComment={handleDeleteComment}
            />
            <div className="mt-4">
              <CommentForm
                onAddComment={handleAddComment}
                commentToEdit={commentToEdit}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                onCancelEdit={() => setCommentToEdit(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard