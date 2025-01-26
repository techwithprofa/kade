"use client";

import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Notification } from './NotificationsPage';

interface NotificationDetailProps {
  notification: Notification;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({ notification }) => {
  const handleReply = () => {
    // Implement reply functionality
    console.log('Reply to notification:', notification.id);
  };

  const handleAction = () => {
    // Implement action functionality
    console.log('Take action on notification:', notification.id);
  };

  return (
    <Card>
      <CardContent>
        <Typography component="span" variant="h5" gutterBottom>
          {notification.title}
        </Typography>
        <Typography component="span" variant="body2" color="text.secondary" gutterBottom>
          {new Date(notification.timestamp).toLocaleString()}
        </Typography>
        <Box component="span" sx={{ mt: 2, display: 'block' }}>
          <Typography component="span" variant="body1">
            {notification.message}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleReply}>
          Reply
        </Button>
        <Button size="small" color="primary" onClick={handleAction}>
          Take Action
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotificationDetail;
