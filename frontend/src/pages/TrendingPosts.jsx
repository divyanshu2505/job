import { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import api from '../services/api';
import PostCard from '../components/PostCard';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { users, posts } = await api.getAllData();
      
      // Find the maximum comment count
      const maxComments = Math.max(...posts.map(post => post.comments?.length || 0));
      
      // Filter posts with the maximum comment count
      const trending = posts.filter(post => post.comments?.length === maxComments);
      
      setUsers(users);
      setTrendingPosts(trending);
      setLoading(false);
    };

    fetchData();
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
        Trending Posts
      </Typography>
      {trendingPosts.length === 0 ? (
        <Typography>No trending posts available</Typography>
      ) : (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Posts with the most comments ({trendingPosts[0]?.comments?.length || 0})
          </Typography>
          {trendingPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              user={getUserById(post.userId)} 
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TrendingPosts;