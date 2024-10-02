// components/VideoItem.tsx

import React from 'react';
import { Video } from '../types/Video';

interface VideoItemProps {
  video: Video;
  onSelect: (video: Video) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, onSelect }) => {
  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <img
        src={video.image}
        alt={`Thumbnail for Video ${video.id}`}
        className="w-full h-auto object-cover"
        onClick={() => onSelect(video)} // Make sure this function is called when clicked
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="bg-black bg-opacity-50 text-white text-2xl p-4 rounded-full"
          onClick={() => onSelect(video)} // Call the onSelect function to open the modal
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default VideoItem;
