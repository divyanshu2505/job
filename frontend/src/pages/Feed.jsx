import { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import api from '../services/api';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { users, posts } = await api.getAllData();
      
      // Sort posts by date (newest first)
      const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setUsers(users);
      setPosts(sortedPosts);
      setLoading(false);
    };

    fetchData();

    // Set up polling for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const getUserById = (userId) => users.find(user => user.id === userId) || {};

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Latest Posts
      </Typography>
      {posts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            user={getUserById(post.userId)} 
          />
        ))
      )}
    </div>
  );
};

export default Feed;