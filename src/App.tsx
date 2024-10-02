import React, { useState, useEffect, useCallback, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import _, { debounce } from 'lodash';
import Modal from 'react-modal';

// Required to bind modal to your app element
Modal.setAppElement('#root');

interface Video {
  id: number;
  url: string;
  image: string;
  videoFile: string;
  duration: number;
}

// Helper function to convert seconds to mm:ss format
const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const getPerPage = () => {
  if (window.innerWidth >= 1280) return 30;
  if (window.innerWidth >= 768) return 10;
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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('Trending');
  const API_KEY = 'YcwMJ3BxGg6DbelCgmc2iBGSqKpiXXchaIAqgYNKS7x97h0nBkvZk1f5';

  const searchInputRef = useRef<HTMLInputElement>(null);  // Ref for the search input

  const debouncedSetQuery = useCallback(
    debounce((query: string) => {
      setQuery(query);
    }, 500),
    []
  );

  const getNetworkSpeed = () => {
    // Check if the Network Information API is supported
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType; // Values like '4g', '3g', '2g', 'slow-2g'
    }
    return null; // Return null if the API is not supported
  };
  
  const fetchVideos = async (page: number, clearVideos: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
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
  
      // Get the current network speed
      const networkSpeed = getNetworkSpeed();
  
      const fetchedVideos = data.videos.map((video: any) => {
        // Log the video files for debugging purposes
        console.log("Video Files for video id", video.id, video.video_files);
  
        // Filter video files based on network speed
        const selectedVideo = video.video_files.find((file: any) => {
          // Choose video based on network speed
          if (networkSpeed === '4g') {
            // For fast connections, pick UHD or HD
            return file.quality === 'uhd' || file.quality === 'hd';
          } else if (networkSpeed === '3g') {
            // For moderate connections, pick SD or HD
            return file.quality === 'hd' || file.quality === 'sd';
          } else {
            // For slow connections (2g or below), pick the lowest quality (SD)
            return file.quality === 'sd';
          }
        }) || video.video_files.reduce((prev: any, current: any) => prev.height > current.height ? prev : current); // Default to highest quality if no match
  
        return {
          id: video.id,
          url: video.url,
          image: video.image,
          videoFile: selectedVideo.link,  // Use the selected video link based on network speed
          duration: video.duration,
        };
      });
  
      setVideos((prevVideos) => clearVideos ? [...fetchedVideos] : [...prevVideos, ...fetchedVideos]);
  
      if (fetchedVideos.length < perPage) {
        setHasMore(false);
      }
  
      setLoading(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchVideos(1, true);
      setPage(1);
      setHasMore(true);
    }
  }, [query]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSetQuery(searchTerm);
    }
  }, [searchTerm, debouncedSetQuery]);

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

  const openModal = (video: Video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
    // Blur the search input when modal opens
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedVideo(null);
  };

  const masonryBreakpoints = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1
  };

  return (
    <div className="h-screen flex bg-gray-50">
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
        <div className="fixed top-0 left-64 right-0 p-6 bg-gray-50">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            ref={searchInputRef}  // Assign ref to the input
          />
        </div>

        <div
          id="scrollableDiv"
          className="flex-1 mt-20 overflow-y-auto p-4"
          style={{ height: '80vh', overflow: 'auto' }}
        >
          {error && (
            <div className="text-center text-red-600 mb-4">
              <p>{error}</p>
            </div>
          )}

          <InfiniteScroll
            dataLength={videos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={<p className="text-center">No more videos</p>}
            scrollableTarget="scrollableDiv"
          >
            <Masonry
              breakpointCols={masonryBreakpoints}
              className="flex w-auto"
              columnClassName="masonry-grid_column space-y-6 px-3"
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={video.image}
                    alt={`Thumbnail for Video ${video.id}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      className="bg-black bg-opacity-50 text-white text-2xl p-4 rounded-full hover:bg-opacity-75 transition-opacity"
                      onClick={() => openModal(video)}
                    >
                      ▶
                    </button>
                  </div>
                </div>
              ))}
            </Masonry>
          </InfiniteScroll>
        </div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}  // Clicking outside will trigger this
          className=" inset-0 grid place-self-center w-fit h-fit p-4"
          overlayClassName="fixed flex justify-center inset-0 bg-black bg-opacity-75"
          shouldCloseOnOverlayClick={true}  // Ensures closing on outside click
        >
          <div className="bg-white rounded-lg overflow-hidden w-[135vh]">
            {/* Modal Header */}
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-bold text-lg">Video Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            {/* Fixed Video Section */}
            <div className="relative h-[85vh] flex justify-center items-center overflow-hidden">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                src={selectedVideo?.videoFile}
              ></video>
            </div>
            {/* Footer Section with Buttons */}
            <div className="p-4 flex justify-between items-center">
              <p className="text-sm font-medium">Duration: {formatDuration(selectedVideo?.duration || 0)}</p>
              <div className="space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Collect</button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Like</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Free Download</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
