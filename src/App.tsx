import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import _, { debounce } from 'lodash';

interface Video {
  id: number;
  url: string;
  image: string;
  duration: number;
}

// Helper function to convert seconds to mm:ss format
const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const getPerPage = () => {
  if (window.innerWidth >= 1280) return 30; // Adjust per-page item count for performance
  if (window.innerWidth >= 768) return 20;
  return 10;
};

// Tailwind Spinner Loader
const Loader = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('Trending');
  const API_KEY = 'YcwMJ3BxGg6DbelCgmc2iBGSqKpiXXchaIAqgYNKS7x97h0nBkvZk1f5';

  // Debounce the query update to optimize the number of requests sent
  const debouncedSetQuery = useCallback(
    debounce((query: string) => {
      setQuery(query);
    }, 500),
    []
  );

  // Helper function to fetch videos
  const fetchVideos = async (page: number, clearVideos: boolean = false) => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const perPage = getPerPage();
      const response = await fetch(
        `https://api.pexels.com/videos/search?query=${query}&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();

      if (!data.videos || !Array.isArray(data.videos)) {
        throw new Error('Invalid response from API');
      }

      const fetchedVideos = data.videos.map((video: any) => ({
        id: video.id,
        url: video.url,
        image: video.image,
        duration: video.duration,
      }));

      setVideos((prevVideos) => clearVideos ? [...fetchedVideos] : [...prevVideos, ...fetchedVideos]);

      // If fewer videos are returned than requested, assume we have all the data.
      if (fetchedVideos.length < perPage) {
        setHasMore(false);
      }

      setLoading(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  // Handle search term changes: Reset videos and fetch the first page
  useEffect(() => {
    if (query) {
      fetchVideos(1, true);
      setPage(1); // Reset page to 1
      setHasMore(true); // Reset hasMore for new search term
    }
  }, [query]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSetQuery(searchTerm);
    }
  }, [searchTerm, debouncedSetQuery]);

  // Fetch more data when the page changes (for pages > 1)
  useEffect(() => {
    if (page > 1) {
      fetchVideos(page);
    }
  }, [page]);

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Breakpoint columns for the Masonry grid layout
  const masonryBreakpoints = {
    default: 4, // 4 columns for large screens
    1024: 3,    // 3 columns for medium screens
    768: 2,     // 2 columns for small screens
    480: 1      // 1 column for extra small screens
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 fixed h-full">
        <h2 className="font-bold text-lg mb-4">Categories</h2>
        <ul className="space-y-2">
          <li
            className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            onClick={() => setSearchTerm('cereal')}
          >
            Cereal
          </li>
          <li
            className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            onClick={() => setSearchTerm('recipes')}
          >
            Recipes
          </li>
        </ul>
      </aside>

      <div className="flex-1 flex flex-col ml-64 p-6">
        {/* Search bar */}
        <div className="fixed top-0 left-64 right-0 p-6 bg-gray-50 z-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        {/* Video content area */}
        <div
          id="scrollableDiv"
          className="flex-1 mt-20 overflow-y-auto p-4" // Padding around the grid container
          style={{ height: '80vh', overflow: 'auto' }}
        >
          {/* Error handling */}
          {error && (
            <div className="text-center text-red-600 mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Infinite Scroll */}
          <InfiniteScroll
            dataLength={videos.length} // The number of items loaded so far
            next={fetchMoreData} // Function to load more data
            hasMore={hasMore} // Whether there is more data to load
            loader={<Loader />} // Updated loader
            endMessage={<p className="text-center">No more videos</p>} // Message when all items are loaded
            scrollableTarget="scrollableDiv" // Make sure InfiniteScroll uses the correct container
          >
            {/* Masonry Grid for Videos */}
            <Masonry
              breakpointCols={masonryBreakpoints}
              className="flex w-auto" // Container class for the masonry grid
              columnClassName="masonry-grid_column space-y-6 px-3" // Space between columns and items
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={video.image}
                      alt={`Video ${video.id}`}
                      className="w-full h-auto object-cover"
                    />
                  </a>
                  <div className="p-2">
                    <p className="font-semibold text-sm">
                      Duration: {formatDuration(video.duration)}
                    </p>
                  </div>
                </div>
              ))}
            </Masonry>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
