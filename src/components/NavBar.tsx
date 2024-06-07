// src/components/NavBar.tsx
import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">Dynamic Graph Generation</div>
      </div>
    </nav>
  );
};

export default NavBar;
