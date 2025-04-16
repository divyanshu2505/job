import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const UserCard = ({ user, postCount, commentCount, rank }) => {
  const avatarColor = `hsl(${user.id * 137.508 % 360}, 50%, 50%)`;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            #{rank}
          </Typography>
          <Avatar sx={{ bgcolor: avatarColor, mr: 2 }}>
            {user.name.charAt(0)}
          </Avatar>
          <Box flexGrow={1}>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Posts: {postCount} | Comments: {commentCount}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;