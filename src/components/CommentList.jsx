import React from 'react'

const CommentList = ({ comments, onEditComment, onDeleteComment }) => {
  if (!Array.isArray(comments)) {
    return <p>No hay comentarios disponibles.</p>
  }

  if (comments.length === 0) {
    return <p>Aún no hay comentarios.</p>
  }

  return (
    <div className="mb-4">
      {comments.map(c => (
        <div
          key={c._id}
          className="card bg-light mb-3 shadow-sm"
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-0">{c.name}</h5>
              <small className="text-muted">
                {new Date(c.date).toLocaleString()}
              </small>
            </div>
            <p className="card-text">{c.content}</p>
            <div className="d-flex justify-content-end gap-2">
              <button
                onClick={() => onEditComment(c)}
                className="btn btn-sm btn-warning"
              >
                Editar
              </button>
              <button
                onClick={() => onDeleteComment(c._id)}
                className="btn btn-sm btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList