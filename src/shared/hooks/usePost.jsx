import { useState, useEffect } from "react";
import { getPostsRequest } from "../../services/api.js";

export const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      const res = await getPostsRequest();

      if (res.error) {
        setError("Error al cargar las publicaciones");
        setPosts([]);
        setFilteredPosts([]);
      } else {
        setPosts(res.data || []);
        setFilteredPosts(res.data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filterByCourse = (courseName) => {
    if (!courseName || courseName === "") {
      setFilteredPosts(posts);
      return;
    }
    const filtered = posts.filter(
      (post) => post.course && post.course.toUpperCase() === courseName.toUpperCase()
    );
    setFilteredPosts(filtered);
  };

  return {
    posts: filteredPosts,
    loading,
    error,
    filterByCourse,
  };
};
