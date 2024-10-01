// FilterDropdown.tsx
import React, { ChangeEvent } from 'react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  onFilter: (selectedOption: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, onFilter }) => {
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}</label>
      <select
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded-lg w-full sm:w-40"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
