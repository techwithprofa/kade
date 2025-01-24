'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const AdminNavbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            href="/admin/employees"
            sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            Employees
          </Button>
          <Button 
            color="inherit"
            sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
