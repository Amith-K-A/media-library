import React, { useRef } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed top-0 left-64 right-0 py-4 px-6 bg-gray-50 shadow-sm"> {/* Added py-4 for vertical padding */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        ref={searchInputRef}
      />
    </div>
  );
};

export default SearchBar;
