'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const EmployeeIdCardDemo = dynamic(() => import('@/components/EmployeeIdCardDemo'), {
  ssr: false
});

export default function IdCardDemoPage() {
  return (
    <div className="container mx-auto">
      <EmployeeIdCardDemo />
    </div>
  );
}
