import { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import api from '../services/api';
import UserCard from '../components/UserCard';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { users, posts } = await api.getAllData();
      
      // Calculate comment count per user
      const userCommentCount = {};
      const userPostCount = {};
      
      posts.forEach(post => {
        // Count posts per user
        userPostCount[post.userId] = (userPostCount[post.userId] || 0) + 1;
        
        // Count comments on user's posts
        userCommentCount[post.userId] = (userCommentCount[post.userId] || 0) + (post.comments?.length || 0);
      });
      
      // Create array of users with their counts
      const usersWithCounts = users.map(user => ({
        ...user,
        postCount: userPostCount[user.id] || 0,
        commentCount: userCommentCount[user.id] || 0,
      }));
      
      // Sort by comment count (descending) and get top 5
      const sortedUsers = [...usersWithCounts].sort((a, b) => b.commentCount - a.commentCount).slice(0, 5);
      
      setTopUsers(sortedUsers);
      setLoading(false);
    };

    fetchData();
  }, []);

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
        Top Users by Engagement
      </Typography>
      {topUsers.length === 0 ? (
        <Typography>No users available</Typography>
      ) : (
        topUsers.map((user, index) => (
          <UserCard 
            key={user.id} 
            user={user} 
            postCount={user.postCount} 
            commentCount={user.commentCount} 
            rank={index + 1} 
          />
        ))
      )}
    </div>
  );
};

export default TopUsers;