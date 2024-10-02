// components/SearchBar.tsx

import React, { useRef } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed top-0 left-64 right-0 p-6 bg-gray-50">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // Update onChange handler
        className="p-2 border border-gray-300 rounded-lg w-full"
        ref={searchInputRef}
      />
    </div>
  );
};

export default SearchBar;
