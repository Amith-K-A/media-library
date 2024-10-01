// SearchBar.tsx
import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="p-2 border border-gray-300 rounded-lg w-full sm:w-64"
    />
  );
};

export default SearchBar;
