import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import { debounce } from 'lodash';
import { fetchVideos } from './services/videoService';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import VideoModal from './components/VideoModal';
import { Video } from './types/Video';

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
  const [initialFetchCompleted, setInitialFetchCompleted] = useState<boolean>(false);

  // Debounced query setter
  const debouncedSetQuery = useCallback(
    debounce((newQuery: string) => {
      // If the search input is cleared, reset query to 'Trending'
      if (newQuery === '') {
        setQuery('Trending');
      } else {
        setQuery(newQuery);
      }
    }, 500),
    []
  );

  // Update debounced query when searchTerm changes
  useEffect(() => {
    debouncedSetQuery(searchTerm);
  }, [searchTerm, debouncedSetQuery]);

  // Fetch videos whenever query changes
  useEffect(() => {
    if (query) {
      (async () => {
        try {
          setLoading(true);
          const fetchedVideos = await fetchVideos(query, 1);
          setVideos(fetchedVideos);
          setPage(1);
          setHasMore(fetchedVideos.length > 0);
          setLoading(false);
          setInitialFetchCompleted(true);
        } catch (error: unknown) {
          setError(error instanceof Error ? error.message : 'Something went wrong');
          setLoading(false);
          setInitialFetchCompleted(true);
        }
      })();
    }
  }, [query]);

  // Fetch more data as the page number increments
  useEffect(() => {
    if (page > 1) {
      (async () => {
        try {
          const fetchedVideos = await fetchVideos(query, page);
          setVideos((prevVideos) => [...prevVideos, ...fetchedVideos]);
          if (fetchedVideos.length === 0) {
            setHasMore(false);
          }
        } catch (error: unknown) {
          setError(error instanceof Error ? error.message : 'Something went wrong');
        }
      })();
    }
  }, [page, query]);

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar setSearchTerm={setSearchTerm} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-1 flex flex-col ml-64 p-6">
        {/* Show error message */}
        {error && (
          <div className="text-center text-red-600 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Show loader if loading */}
        {loading && <div className="grid place-items-center h-full"><Loader /></div>}

        {/* Show "no results" message if no videos are found, loading is complete, and initial fetch is done */}
        {!loading && initialFetchCompleted && videos.length === 0 && (
          <div className="text-center text-gray-500 pt-40">
            <p>No results found for "{query}".</p>
          </div>
        )}

        <div id="scrollableDiv" className="flex-1 mt-20 overflow-y-auto p-4" style={{ height: '80vh' }}>
          {/* Infinite Scroll */}
          {!loading && videos.length > 0 && (
            <InfiniteScroll
              dataLength={videos.length}
              next={() => setPage(page + 1)}
              hasMore={hasMore}
              loader={<Loader />}
              scrollableTarget="scrollableDiv"
            >
              <Masonry
                breakpointCols={{ default: 4, 1024: 3, 768: 2, 480: 1 }}
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
                        className="bg-black bg-opacity-50 text-white text-2xl p-4 rounded-full"
                        onClick={() => {
                          setSelectedVideo(video);
                          setModalIsOpen(true);
                        }}
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                ))}
              </Masonry>
            </InfiniteScroll>
          )}
        </div>

        {/* Modal */}
        {selectedVideo && (
          <VideoModal
            isOpen={modalIsOpen}
            video={selectedVideo}
            onClose={() => setModalIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
