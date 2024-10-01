import React from 'react';

interface SidebarProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, onCategorySelect }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onCategorySelect(category)}
            className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
