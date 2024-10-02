// components/VideoGrid.tsx

import React from 'react';
import Masonry from 'react-masonry-css';
import Skeleton from './Skeleton';
import VideoItem from './VideoItem';
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
      className="flex w-auto"
      columnClassName="masonry-grid_column space-y-6 px-3"
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
