import React, { useState } from 'react';

interface SidebarProps {
  setSearchTerm: (term: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSearchTerm }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Trending');

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

  const handleCategoryClick = (category: string) => {
    setSearchTerm(category);
    setActiveCategory(category);
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 fixed h-full">
      <h2
        className="font-bold text-lg mb-4 cursor-pointer"
        onClick={() => window.location.reload()}
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
                  ? 'bg-blue-500 text-white font-bold'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900'
              }`}
            onClick={() => handleCategoryClick(category)}
            aria-current={activeCategory === category ? 'true' : undefined} // Use aria-current for active category
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
