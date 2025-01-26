"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import NotificationDetail from './NotificationDetail';
import { getNotifications } from '@/shared/services/notificationService';

export type NotificationType = 'admin' | 'tech' | 'repair' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<NotificationType | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  const filteredNotifications = selectedType 
    ? notifications.filter(n => n.type === selectedType)
    : notifications;

  const notificationTypes: { type: NotificationType; label: string }[] = [
    { type: 'admin', label: 'From Admin' },
    { type: 'tech', label: 'From Tech Team' },
    { type: 'repair', label: 'From Repair Section' },
    { type: 'system', label: 'From System' },
  ];

  const handleTypeClick = (type: NotificationType | null) => {
    setSelectedType(type);
    setSelectedNotification(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleBack = () => {
    setSelectedNotification(null);
  };

  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant={selectedType === null ? "contained" : "outlined"}
          onClick={() => handleTypeClick(null)}
        >
          All Notifications
        </Button>
        {notificationTypes.map(({ type, label }) => (
          <Button
            key={type}
            variant={selectedType === type ? "contained" : "outlined"}
            onClick={() => handleTypeClick(type)}
          >
            {label}
          </Button>
        ))}
      </Stack>

      {selectedNotification ? (
        <>
          <Button onClick={handleBack} sx={{ mb: 2 }}>
            Back to List
          </Button>
          <NotificationDetail notification={selectedNotification} />
        </>
      ) : (
        <Paper elevation={2}>
          <List>
            {filteredNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                {index > 0 && <Divider />}
                <ListItem
                  disablePadding
                  sx={{
                    bgcolor: notification.read ? 'inherit' : 'action.hover',
                  }}
                >
                  <ListItemButton onClick={() => handleNotificationClick(notification)}>
                    <ListItemText
                      primary={
                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography component="span" variant="subtitle1">
                            {notification.title}
                          </Typography>
                          <Typography component="span" variant="caption" color="text.secondary">
                            {new Date(notification.timestamp).toLocaleString()}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              maxWidth: '80%'
                            }}
                          >
                            {notification.message}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{
                              textTransform: 'uppercase',
                              bgcolor: 'action.selected',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.7rem',
                            }}
                          >
                            {notification.type}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default NotificationsPage;
