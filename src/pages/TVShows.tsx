import React, { useState, useEffect } from 'react';
import { getTrending, getNetflixOriginals, getTopRated } from '../api/tmdb';
import Row from '../components/Row';

const TVShows = () => {
  const [shows, setShows] = useState<any>({});

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const [trending, originals, topRated] = await Promise.all([
          getTrending(),
          getNetflixOriginals(),
          getTopRated()
        ]);

        setShows({
          trending: trending.data.results.filter((item: any) => item.media_type === 'tv'),
          originals: originals.data.results,
          topRated: topRated.data.results.filter((item: any) => item.media_type === 'tv')
        });
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="space-y-8">
        <Row title="Trending TV Shows" movies={shows.trending || []} isLarge />
        <Row title="Netflix Originals" movies={shows.originals || []} />
        <Row title="Top Rated Shows" movies={shows.topRated || []} />
      </div>
    </div>
  );
};

export default TVShows;