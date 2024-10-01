// ClipGrid.tsx
import React from 'react';

interface Clip {
  title: string;
  duration: string;
  thumbnail: string;
}

interface ClipGridProps {
  clips: Clip[];
}

const ClipGrid: React.FC<ClipGridProps> = ({ clips }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {clips.map((clip, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <img src={clip.thumbnail} alt={clip.title} className="w-full h-32 object-cover" />
          <div className="p-2">
            <p className="font-semibold text-sm">{clip.title}</p>
            <span className="text-gray-500 text-xs">{clip.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClipGrid;
