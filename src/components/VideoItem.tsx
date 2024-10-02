// components/VideoItem.tsx

import React from 'react';
import { Video } from '../types/Video';

interface VideoItemProps {
  video: Video;
  onSelect: (video: Video) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, onSelect }) => {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
      onClick={() => onSelect(video)}
    >
      {/* Video Thumbnail */}
      <img
        src={video.image}
        
        alt={`Thumbnail for ${video.id}`}
        className="w-full h-auto transform transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 ease-in-out">
        <button className="text-white text-3xl">▶</button>
      </div>
    </div>
  );
};

export default VideoItem;
