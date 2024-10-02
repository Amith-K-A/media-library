// services/videoService.ts

import { getPerPage, getNetworkSpeed } from '../helpers/helpers';

const API_KEY = 'YcwMJ3BxGg6DbelCgmc2iBGSqKpiXXchaIAqgYNKS7x97h0nBkvZk1f5';

export const fetchVideos = async (query: string, page: number) => {
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

  const networkSpeed = getNetworkSpeed();

  const fetchedVideos = data.videos.map((video: any) => {
    const selectedVideo = video.video_files.find((file: any) => {
      if (networkSpeed === '4g') return file.quality === 'uhd' || file.quality === 'hd';
      if (networkSpeed === '3g') return file.quality === 'hd' || file.quality === 'sd';
      return file.quality === 'sd';
    }) || video.video_files.reduce((prev: any, current: any) => prev.height > current.height ? prev : current);

    return {
      id: video.id,
      url: video.url,
      image: video.image,
      videoFile: selectedVideo.link,
      duration: video.duration,
      user: video.user,
    };
  });

  return fetchedVideos;
};
