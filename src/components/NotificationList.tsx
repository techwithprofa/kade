"use client";

import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { Notification, NotificationType } from './NotificationsPage';
import { getNotificationsByType } from '@/services/notificationService';

interface NotificationListProps {
  type: NotificationType;
  onNotificationClick: (notification: Notification) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ type, onNotificationClick }) => {
  const notifications = getNotificationsByType(type);

  return (
    <Paper elevation={2}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Notifications
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem
            key={notification.id}
            disablePadding
            sx={{
              bgcolor: notification.read ? 'inherit' : 'action.hover',
            }}
          >
            <ListItemButton onClick={() => onNotificationClick(notification)}>
              <ListItemText
                primary={notification.title}
                secondary={new Date(notification.timestamp).toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default NotificationList;
