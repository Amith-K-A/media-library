import { getPerPage } from '../helpers/helpers';
import { Video } from '../models/Video';

const API_KEY = process.env.REACT_APP_API_KEY || '';

if (!API_KEY) {
  throw new Error('Missing API key. Please ensure API_KEY is set in your environment.');
}

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
