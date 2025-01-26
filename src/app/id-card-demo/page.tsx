'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const EmployeeIdCardDemo = dynamic(() => import('@/features/employees/EmployeeIdCardDemo'), {
  ssr: false
});

export default function IdCardDemoPage() {
  return (
    <div className="container mx-auto">
      <EmployeeIdCardDemo />
    </div>
  );
}
