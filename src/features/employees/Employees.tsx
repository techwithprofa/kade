'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
import EmployeeIdCard from './EmployeeIdCard';
import PrintableIdCard from './PrintableIdCard';
import PrintIcon from '@mui/icons-material/Print';
import { generateEmployeeId } from '@/shared/types/employee';
import '@/styles/print.css';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  contactNumber: string;
  dateOfBirth: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showIdCard, setShowIdCard] = useState(false);
  const [showPrintLayout, setShowPrintLayout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    contactNumber: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    // Mock data
    setEmployees([
      {
        id: 'EMP001',
        name: 'John Doe',
        email: 'john@example.com',
        position: 'Developer',
        department: 'IT',
        contactNumber: '123-456-7890',
        dateOfBirth: '1990-01-01',
      },
      // Add more mock employees as needed
    ]);
  }, []);

  const handleOpen = (employee?: Employee) => {
    if (employee) {
      setSelectedEmployee(employee);
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        contactNumber: employee.contactNumber,
        dateOfBirth: employee.dateOfBirth,
      });
    } else {
      setSelectedEmployee(null);
      setFormData({
        name: '',
        email: '',
        position: '',
        department: '',
        contactNumber: '',
        dateOfBirth: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedEmployee) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id
            ? { ...emp, ...formData }
            : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: generateEmployeeId(),
        ...formData,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleShowIdCard = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowIdCard(true);
  };

  const handlePrint = () => {
    if (!selectedEmployee) return;
    setShowPrintLayout(true);
    setTimeout(() => {
      window.print();
      setShowPrintLayout(false);
    }, 100);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 no-print">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Employee
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Key</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.contactNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(employee)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleShowIdCard(employee)} color="secondary">
                    <BadgeIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Employee Form Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="position"
            label="Position"
            type="text"
            fullWidth
            value={formData.position}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            value={formData.department}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="contactNumber"
            label="Contact Number"
            type="tel"
            fullWidth
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedEmployee ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ID Card Dialog */}
      <Dialog
        open={showIdCard}
        onClose={() => setShowIdCard(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center">
          Employee ID Card
          <div className="flex gap-2">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrint}
              startIcon={<PrintIcon />}
            >
              Print ID Cards
            </Button>
            <Button onClick={() => setShowIdCard(false)}>
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="no-print">
            {selectedEmployee && <EmployeeIdCard employee={selectedEmployee} />}
          </div>
          
          {/* Print Layout */}
          {showPrintLayout && (
            <div className="hidden print:block">
              {selectedEmployee && <PrintableIdCard employee={selectedEmployee} />}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
