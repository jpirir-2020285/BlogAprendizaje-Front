import React, { useState, useEffect } from 'react'
import usePosts from '../shared/hooks/usePost.jsx'
import PostCard from './PostCard.jsx'

const PostList = () => {
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const { posts, loading, error } = usePosts(course, year)

  useEffect(() => {
    console.log('Curso seleccionado:', course)
    console.log('Año seleccionado:', year)
  }, [course, year])

  const sortedPosts = Array.isArray(posts)
    ? posts.slice().sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() -
          new Date(a.dateCreated).getTime()
      )
    : []

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-6">
        <select
          className="border rounded px-3 py-2"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Todos los cursos</option>
          <option value="TALLER">Taller</option>
          <option value="TECNOLOGIA">Tecnología</option>
          <option value="PRACTICA">Practica Supervisada</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Todos los Años</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p>No se encontraron publicaciones para el filtro seleccionado</p>
        )
      )}
    </div>
  )
}

export default PostList
