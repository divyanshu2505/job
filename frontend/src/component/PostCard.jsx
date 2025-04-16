import { Card, CardContent, Typography, Avatar, CardHeader, IconButton } from '@mui/material';

import CommentIcon from '@mui/icons-material/Comment';

const PostCard = ({ post, user }) => {
  // Generate random avatar color based on user ID
  const avatarColor = `hsl(${(user?.id || 0) * 137.508 % 360}, 50%, 50%)`;

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }} aria-label="user">
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
        }
        title={user?.name || 'Unknown User'}
        subheader={new Date(post.date).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <CommentIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
          {post.comments?.length || 0} comments
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;