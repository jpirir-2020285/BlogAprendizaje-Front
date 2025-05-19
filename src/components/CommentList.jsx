import React from 'react'

const CommentList = ({ comments, onEditComment, onDeleteComment }) => {
  if (!Array.isArray(comments)) {
    return <p>No hay comentarios disponibles.</p>
  }

  if (comments.length === 0) {
    return <p>Aún no hay comentarios.</p>
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="border rounded p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">{comment.name}</h4>
            <small className="text-gray-500">
              {new Date(comment.date).toLocaleString()}
            </small>
          </div>
          <p className="mb-3">{comment.content}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onEditComment(comment)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={() => onDeleteComment(comment._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList
