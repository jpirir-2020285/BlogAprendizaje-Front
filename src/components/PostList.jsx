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
    <div className="container my-5">
      <h1 className="display-2 text-primary text-center fw-bold mb-5">
        Blog Personal
      </h1>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <select
            className="form-select form-select-lg border-primary"
            value={course}
            onChange={e => setCourse(e.target.value)}
          >
            <option value="">Todos los cursos</option>
            <option value="TALLER">Taller</option>
            <option value="TECNOLOGIA">Tecnología</option>
            <option value="PRACTICA">Práctica Supervisada</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <select
            className="form-select form-select-lg border-primary"
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            <option value="">Todos los años</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-center text-secondary">Cargando…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-muted">No hay publicaciones.</p>
        )}

        {posts.map(post => (
          <div key={post._id} className="col">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostList