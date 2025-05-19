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
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" required />

      <textarea
        placeholder="Escribe tu comentario"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded px-3 py-2"
        rows={4}
        required
      />

      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {commentToEdit ? 'Actualizar' : 'Comentar'}
        </button>

        {commentToEdit && (
          <>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </form>
  )
}

export default CommentForm
