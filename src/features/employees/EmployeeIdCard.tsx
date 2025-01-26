import React from 'react';
import { Employee } from '@/shared/types/employee';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

interface EmployeeIdCardProps {
  employee: Employee;
}

const EmployeeIdCard: React.FC<EmployeeIdCardProps> = ({ employee }) => {
  return (
    <div className="w-[7cm] h-[11cm] mx-auto bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-lg overflow-hidden relative">
      {/* Punch Hole Area */}
      <div className="h-[10mm] w-full bg-transparent" />
      
      {/* Top Header with Company Name */}
      <div className="bg-blue-600 w-full h-[15mm] rounded-b-[30px] pt-2 px-4 relative">
        <div className="absolute top-0 right-0 w-[25mm] h-[25mm] bg-blue-500 rounded-full -mr-[12mm] -mt-[12mm] opacity-20" />
        <h1 className="text-lg font-bold text-white text-center relative z-10">
          Kelekade Cycle
        </h1>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4 relative z-10">
        {/* Position Badge */}
        <div className="flex justify-center mb-3">
          <span className="bg-white/90 backdrop-blur text-blue-600 px-4 py-1 rounded-full text-xs font-semibold shadow-sm">
            {employee.position}
          </span>
        </div>

        {/* Employee Name and Department */}
        <div className="text-center mb-3">
          <h2 className="text-lg font-bold text-gray-800 capitalize">{employee.name}</h2>
          <p className="text-xs text-gray-600">{employee.department}</p>
        </div>

        {/* Employee Key Card */}
        <div className="bg-white/80 backdrop-blur rounded-lg p-2.5 shadow-sm mb-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Employee Key</p>
          <p className="text-xs font-mono text-gray-800 font-medium">{employee.id}</p>
        </div>

        {/* QR and Barcode Section */}
        <div className="flex flex-col items-center space-y-3">
          {/* QR Code */}
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <QRCode
              value={employee.id}
              size={60}
              level="H"
              className="mx-auto"
            />
          </div>

          {/* Barcode */}
          <div className="bg-white px-2 py-1 rounded-lg shadow-sm w-full flex justify-center">
            <Barcode 
              value={employee.id}
              width={1}
              height={20}
              fontSize={8}
              margin={0}
              background="#FFFFFF"
              lineColor="#374151"
            />
          </div>
        </div>
      </div>

      {/* Bottom Design Element */}
      <div className="absolute bottom-0 left-0 w-full h-[15mm] bg-gradient-to-t from-blue-100/50 to-transparent" />

      {/* Punch Hole Guide Circle */}
      <div className="absolute top-[5mm] left-1/2 transform -translate-x-1/2 w-[2.5mm] h-[2.5mm] rounded-full border-2 border-dashed border-gray-300" />
    </div>
  );
};

export default EmployeeIdCard;
