// components/Skeleton.tsx

import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Placeholder for video thumbnail */}
      <div className="h-48 bg-gray-300 animate-pulse"></div> 
      
      {/* Placeholder for video details */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-1/4"></div> {/* Duration */}
      </div>
    </div>
  );
};

export default Skeleton;
