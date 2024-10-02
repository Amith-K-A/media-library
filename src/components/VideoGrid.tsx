// components/VideoGrid.tsx

import React from 'react';
import Masonry from 'react-masonry-css';
import VideoItem from './VideoItem';
import Skeleton from './Skeleton';
import { Video } from '../types/Video';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  onSelect: (video: Video) => void;
  skeletonCount: number;
  masonryBreakpoints: any;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading, onSelect, skeletonCount, masonryBreakpoints }) => {
  return (
    <Masonry
      breakpointCols={masonryBreakpoints}
      className="flex w-auto -ml-4"  // Adjust margins to ensure consistent grid
      columnClassName="masonry-column pl-4 space-y-4" // Add padding-left to columns and spacing between items
    >
      {loading
        ? [...Array(skeletonCount)].map((_, index) => <Skeleton key={index} />)
        : videos.map((video) => (
            <VideoItem key={video.id} video={video} onSelect={onSelect} />
          ))}
    </Masonry>
  );
};

export default VideoGrid;
