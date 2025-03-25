import React, { useState, useEffect } from 'react';
import {
  getTrending,
  getTopRated,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies
} from '../api/tmdb';
import Row from '../components/Row';

const Movies = () => {
  const [movies, setMovies] = useState<any>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, topRated, action, comedy, horror, romance] = await Promise.all([
          getTrending(),
          getTopRated(),
          getActionMovies(),
          getComedyMovies(),
          getHorrorMovies(),
          getRomanceMovies()
        ]);

        setMovies({
          trending: trending.data.results.filter((item: any) => item.media_type === 'movie'),
          topRated: topRated.data.results,
          action: action.data.results,
          comedy: comedy.data.results,
          horror: horror.data.results,
          romance: romance.data.results
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="space-y-8">
        <Row title="Trending Movies" movies={movies.trending || []} isLarge />
        <Row title="Top Rated" movies={movies.topRated || []} />
        <Row title="Action" movies={movies.action || []} />
        <Row title="Comedy" movies={movies.comedy || []} />
        <Row title="Horror" movies={movies.horror || []} />
        <Row title="Romance" movies={movies.romance || []} />
      </div>
    </div>
  );
};

export default Movies;