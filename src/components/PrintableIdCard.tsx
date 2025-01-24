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
          Print ID Cards
        </button>
      </div>

      <div className="print-container">
        {[1, 2].map((_, index) => (
          <div key={index} className="print-card">
            <EmployeeIdCard employee={employee} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintableIdCard;
