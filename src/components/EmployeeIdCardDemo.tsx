'use client';

import React, { useState } from 'react';
import { Employee, generateEmployeeId } from '@/types/employee';
import EmployeeIdCard from './EmployeeIdCard';
import PrintableIdCard from './PrintableIdCard';
import '@/styles/print.css';

const EmployeeIdCardDemo: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>({
    id: generateEmployeeId(),
    name: '',
    contactNumber: '',
    position: '',
    department: '',
    dateOfBirth: '',
  });

  const [showPrintLayout, setShowPrintLayout] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Employee data:', employee);
  };

  const handlePrint = () => {
    setShowPrintLayout(true);
    setTimeout(() => {
      window.print();
      setShowPrintLayout(false);
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Employee Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={employee.contactNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={employee.dateOfBirth}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Employee
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Print ID Cards
              </button>
            </div>
          </form>
        </div>
        
        {/* Preview section */}
        <div className="no-print">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <EmployeeIdCard employee={employee} />
        </div>
      </div>

      {/* Print Layout */}
      {showPrintLayout && (
        <div className="hidden print:block">
          <PrintableIdCard employee={employee} />
        </div>
      )}
    </div>
  );
};

export default EmployeeIdCardDemo;
