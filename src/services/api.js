import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:1310/v1",
  timeout: 3000,
});

const getToken = () => {
  return localStorage.getItem("token");
};

// POSTS

export const getPostsRequest = async () => {
  try {
    return await apiClient.get("/post/getAllPosts");
  } catch (err) {
    return { error: true, err };
  }
};

export const getPostByIdRequest = async (postId) => {
  try {
    return await apiClient.get(`/post/getPost/${postId}`);
  } catch (err) {
    return { error: true, err };
  }
};

export const addPostRequest = async (post) => {
  try {
    return await apiClient.post("/post/addPost", post, {
      headers: {
        Authorization: getToken(),
      },
    });
  } catch (err) {
    return { error: true, err };
  }
};

// COMMENTS

export const getCommentsByPostRequest = async (postId) => {
  try {
    return await apiClient.get(`/comment/getComments/${postId}`);
  } catch (err) {
    return { error: true, err };
  }
};

export const addCommentToPostRequest = async (postId, comment) => {
  try {
    return await apiClient.post(`/comment/addComment/${postId}`, comment, {
      headers: {
        Authorization: getToken(),
      },
    });
  } catch (err) {
    return { error: true, err };
  }
};
