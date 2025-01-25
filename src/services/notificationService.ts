import { Notification, NotificationType } from '@/components/NotificationsPage';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'admin',
    title: 'New Company Policy Update',
    message: 'Please review the updated company policies regarding remote work and flexible hours. These changes will be effective from next month. All employees are required to acknowledge these updates through the HR portal.',
    timestamp: '2025-01-25T08:30:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'tech',
    title: 'System Maintenance Notice',
    message: 'The employee management system will undergo scheduled maintenance this weekend. Expected downtime is 2 hours. Please save all important work before Saturday 10 PM.',
    timestamp: '2025-01-24T15:45:00Z',
    read: true,
  },
  {
    id: '3',
    type: 'repair',
    title: 'Office Printer Maintenance Required',
    message: 'The main office printer (Floor 2) requires maintenance. Technical team will be performing repairs tomorrow between 9 AM - 11 AM. Please use the backup printer on Floor 1 during this time.',
    timestamp: '2025-01-24T11:20:00Z',
    read: false,
  },
  {
    id: '4',
    type: 'system',
    title: 'Security Update Required',
    message: 'Your system requires a critical security update. Please save your work and restart your computer to install the latest security patches.',
    timestamp: '2025-01-23T16:15:00Z',
    read: false,
  },
  {
    id: '5',
    type: 'admin',
    title: 'Upcoming Team Building Event',
    message: 'Mark your calendars! We are organizing a team building event next month. Details about venue and activities will be shared soon. Please fill out the preference survey by end of this week.',
    timestamp: '2025-01-23T09:00:00Z',
    read: true,
  },
  {
    id: '6',
    type: 'tech',
    title: 'New Software Installation',
    message: 'The IT department will be installing new project management software on all systems. Please keep your computers on during lunch break tomorrow for the installation.',
    timestamp: '2025-01-22T14:30:00Z',
    read: true,
  },
  {
    id: '7',
    type: 'system',
    title: 'Password Expiry Notice',
    message: 'Your system password will expire in 3 days. Please update your password following the security guidelines. Contact IT support if you need assistance.',
    timestamp: '2025-01-22T10:45:00Z',
    read: false,
  },
  {
    id: '8',
    type: 'repair',
    title: 'AC Maintenance Schedule',
    message: 'The building management will be conducting AC maintenance next week. Maintenance schedule: Floor 1 (Monday), Floor 2 (Tuesday), Floor 3 (Wednesday).',
    timestamp: '2025-01-21T13:20:00Z',
    read: true,
  }
];

export const getNotifications = () => {
  return mockNotifications;
};

export const getNotificationsByType = (type: NotificationType) => {
  return mockNotifications.filter(notification => notification.type === type);
};

export const getUnreadCount = () => {
  return mockNotifications.filter(notification => !notification.read).length;
};
