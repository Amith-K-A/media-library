// components/Sidebar.tsx

import React from 'react';

interface SidebarProps {
  setSearchTerm: (term: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSearchTerm }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4 fixed h-full">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <ul className="space-y-2">
        <li
          className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={() => setSearchTerm('cereal')}
        >
          Cereal
        </li>
        <li
          className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={() => setSearchTerm('recipes')}
        >
          Recipes
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
