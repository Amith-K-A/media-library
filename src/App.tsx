import React, { useState, useEffect } from 'react';

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
  if (window.innerWidth >= 1280) return 30; // For large screens
  if (window.innerWidth >= 768) return 20;  // For medium screens
  return 20; // For small screens
};


function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('cereal');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = 'YcwMJ3BxGg6DbelCgmc2iBGSqKpiXXchaIAqgYNKS7x97h0nBkvZk1f5';

  const fetchVideos = async (page: number) => {
    if (!searchTerm) {
      setError('Please enter a search term');
      return;
    }
    try {
      const perPage = getPerPage();
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.pexels.com/videos/search?query=${searchTerm}&page=${page}&per_page=${perPage}`,
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

      const fetchedVideos = data.videos.map((video: any) => ({
        id: video.id,
        url: video.url,
        image: video.image,
        duration: video.duration,
      }));

      setVideos((prevVideos) => [...prevVideos, ...fetchedVideos]);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setVideos([]);
    setPage(1);
    fetchVideos(1);
  }, [searchTerm, API_KEY]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    if (page > 1) {
      fetchVideos(page);
    }
  }, [page]);

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
        <div className="flex-1 mt-20 overflow-y-auto">
          {/* Error handling */}
          {error && (
            <div className="text-center text-red-600 mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Video Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={video.image}
                    alt={`Video ${video.id}`}
                    className="w-full h-40 object-cover"
                  />
                </a>
                <div className="p-2">
                  <p className="font-semibold text-sm">
                    Duration: {formatDuration(video.duration)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center mt-4">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
