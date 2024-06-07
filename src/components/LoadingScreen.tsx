// src/components/LoadingEffect.tsx
import React from 'react';

const LoadingEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="text-lg font-semibold">Loading...</div>
    </div>
  );
};

export default LoadingEffect;
