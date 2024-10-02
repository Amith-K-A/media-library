import React, { useState } from 'react';

interface SidebarProps {
  setSearchTerm: (term: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSearchTerm }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Trending'); // Track the active category

  const categories = [
    'AI',
    'Trending',
    'Nature',
    'Technology',
    'Animals',
    'Food',
    'People',
    'Travel',
    'Sports',
    'Art',
  ];

  // Function to handle category click
  const handleCategoryClick = (category: string) => {
    setSearchTerm(category);
    setActiveCategory(category); // Set the clicked category as active
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 fixed h-full">
      <h2 
        className="font-bold text-lg mb-4 cursor-pointer" // Added cursor-pointer for visual indication
        onClick={() => window.location.reload()} // Added onClick event to reload the page when clicked
      >
        Categories
      </h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer py-3 px-4 rounded-lg 
              ${
                activeCategory === category
                  ? 'bg-blue-500 text-white font-bold' // Active category highlighting
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900' // Hover effect for non-active categories
              }`}
            onClick={() => handleCategoryClick(category)}
            aria-selected={activeCategory === category} // Added aria-selected for accessibility
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
