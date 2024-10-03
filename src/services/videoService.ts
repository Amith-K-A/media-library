// services/videoService.ts

import { getPerPage } from '../helpers/helpers';
import { Video } from '../models/Video';

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

  // Map over videos and create new Video instances
  const fetchedVideos = data.videos.map((video: any) => new Video(video));

  return fetchedVideos;
};
