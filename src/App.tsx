import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'lodash';
import { fetchVideos } from './services/videoService';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import VideoModal from './components/VideoModal';
import VideoGrid from './components/VideoGrid';
import ErrorMessage from './components/ErrorMessage';
import { Video } from './types/Video';
import { getSkeletonCount } from './utils/getSkeletonCount';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [allVideosLoaded, setAllVideosLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('Trending');
  const [initialFetchCompleted, setInitialFetchCompleted] = useState<boolean>(false);

  // UseEffect for debounced query update
  useEffect(() => {
    const debouncedSetQuery = debounce((newQuery: string) => {
      if (newQuery === '') {
        setQuery('Trending');
      } else {
        setQuery(newQuery);
      }
    }, 500);

    debouncedSetQuery(searchTerm);
    
    // Cleanup debounce on component unmount
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [searchTerm]);

  // Fetch videos whenever query changes
  useEffect(() => {
    if (query) {
      (async () => {
        try {
          setLoading(true); 
          setAllVideosLoaded(false); 
          const fetchedVideos = await fetchVideos(query, 1);
          setVideos(fetchedVideos);
          setPage(1);
          setHasMore(fetchedVideos.length > 0);
          setLoading(false); 
          setAllVideosLoaded(true); 
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
          setLoadingMore(true);
          const fetchedVideos = await fetchVideos(query, page);
          setVideos((prevVideos) => [...prevVideos, ...fetchedVideos]);
          if (fetchedVideos.length === 0) {
            setHasMore(false);
          }
          setLoadingMore(false);
        } catch (error: unknown) {
          setError(error instanceof Error ? error.message : 'Something went wrong');
          setLoadingMore(false);
        }
      })();
    }
  }, [page, query]);

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
  };

  const masonryBreakpoints = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1,
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar setSearchTerm={setSearchTerm} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-1 flex flex-col ml-64 p-6">
        <ErrorMessage error={error} />

        {loading && (
          <div className="flex-1 mt-20 p-4" style={{ height: '80vh' }}>
            <VideoGrid
              videos={[]}
              loading={true}
              onSelect={handleSelectVideo}
              skeletonCount={getSkeletonCount()}
              masonryBreakpoints={masonryBreakpoints}
            />
          </div>
        )}

        {!loading && initialFetchCompleted && videos.length === 0 && (
          <div className="text-center text-gray-500 pt-40">
            <p>No results found for "{query}".</p>
          </div>
        )}

        {!loading && allVideosLoaded && videos.length > 0 && (
          <div id="scrollableDiv" className="flex-1 mt-20 overflow-y-auto p-4" style={{ height: '80vh' }}>
            <InfiniteScroll
              dataLength={videos.length}
              next={() => setPage(page + 1)}
              hasMore={hasMore}
              loader={loadingMore && <Loader />} 
              scrollableTarget="scrollableDiv"
            >
              <VideoGrid
                videos={videos}
                loading={false}
                onSelect={handleSelectVideo}
                skeletonCount={0}
                masonryBreakpoints={masonryBreakpoints}
              />
            </InfiniteScroll>
          </div>
        )}

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
