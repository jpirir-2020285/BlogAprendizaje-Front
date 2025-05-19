import React, { useState, useEffect } from 'react'

const CommentForm = ({onAddComment,commentToEdit,onUpdateComment,onDeleteComment,onCancelEdit}) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (commentToEdit) {
      setName(commentToEdit.name || '')
      setContent(commentToEdit.content || '')
    }
  }, [commentToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    if (commentToEdit) {
      onUpdateComment(commentToEdit._id, { name, content })
    } else {
      onAddComment(name, content)
    }
    setName('')
    setContent('')
  }

  const handleDelete = () => {
    if (commentToEdit) {
      onDeleteComment(commentToEdit._id)
      setName('')
      setContent('')
    }
  }

  return (
    <div className="card border-primary shadow-sm">
      <div className="card-body">
        <h6 className="card-subtitle mb-3 text-primary">
          {commentToEdit ? 'Editar Comentario' : 'Nuevo Comentario'}
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Escribe tu comentario"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="form-control"
              rows={4}
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {commentToEdit ? 'Actualizar' : 'Comentar'}
            </button>
            {commentToEdit && (
              <>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onCancelEdit()
                    setName('')
                    setContent('')
                  }}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm