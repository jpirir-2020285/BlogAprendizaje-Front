import axios from "axios" 

const api = axios.create({
  baseURL: 'http://localhost:1310/v1',
  timeout: 3000,
})
// Posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`) 
    return response.data  // Ajusta según tu estructura de respuesta
  } catch (error) {
    throw error.response?.data || error 
  }
} 

export const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}`) 
    return response.data 
  } catch (error) {
    throw error.response?.data || error 
  }
} 

// Comentarios
export const getCommentsByPost = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments/post/${postId}`) 
    return response.data 
  } catch (error) {
    throw error.response?.data || error 
  }
} 

export const addCommentToPost = async (postId, commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments/${postId}`, commentData) 
    return response.data 
  } catch (error) {
    throw error.response?.data || error 
  }
} 
