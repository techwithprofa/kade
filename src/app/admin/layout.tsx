'use client';

import AdminNavbar from '@/features/admin/AdminNavbar';
import { Container } from '@mui/material';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <Container className="pt-24 px-4">
        {children}
      </Container>
    </div>
  );
}
