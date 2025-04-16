import axios from 'axios';

const API_BASE_URL = 'http://your-test-server-api.com'; // Replace with actual API URL

const api = {
  // Fetch all posts
  getPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  // Fetch all users
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  // Fetch comments for a specific post
  getComments: async (postId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  // Fetch all data (users, posts, comments)
  getAllData: async () => {
    try {
      const [users, posts] = await Promise.all([
        api.getUsers(),
        api.getPosts(),
      ]);
      
      // Fetch comments for each post
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          const comments = await api.getComments(post.id);
          return { ...post, comments };
        })
      );
      
      return { users, posts: postsWithComments };
    } catch (error) {
      console.error('Error fetching all data:', error);
      return { users: [], posts: [] };
    }
  },
};

export default api;