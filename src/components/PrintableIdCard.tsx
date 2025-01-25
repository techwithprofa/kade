'use client';

import React from 'react';
import { Employee } from '@/types/employee';
import EmployeeIdCard from './EmployeeIdCard';
import '@/styles/print.css';

interface PrintableIdCardProps {
  employee: Employee;
}

const PrintableIdCard: React.FC<PrintableIdCardProps> = ({ employee }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-4 no-print">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Print ID Card
        </button>
        <p className="mt-2 text-sm text-gray-600">
          Click the button above to print the ID cards
        </p>
      </div>

      <div className="print-container">
        <div className="grid-cards">
          <div className="print-card">
            <EmployeeIdCard employee={employee} />
          </div>
          <div className="print-card">
            <EmployeeIdCard employee={employee} />
          </div>
          <div className="print-card">
            <EmployeeIdCard employee={employee} />
          </div>
          <div className="print-card">
            <EmployeeIdCard employee={employee} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableIdCard;
