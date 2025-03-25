import { useState, useEffect, useCallback } from 'react';
import { Play, Info } from 'lucide-react';
import { getNetflixOriginals, getImageUrl } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

// Define movie type
type Movie = {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path: string;
  overview: string;
};

const Banner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  // Fetch Netflix Originals
  const fetchData = useCallback(async () => {
    try {
      const response = await getNetflixOriginals();
      const movies: Movie[] = response.data.results;
      if (movies.length) {
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      }
    } catch (error) {
      console.error('Error fetching banner movie:', error);
    }
  }, []);

  useEffect(() => {
    fetchData(); // Fetch immediately

    // Auto-refresh banner every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (!movie) return null;

  return (
    <div className="relative h-[80vh] mb-8">
      {/* Background Image */}
      <div className="absolute w-full h-full">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title || movie.name || movie.original_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <p className="text-lg text-white mb-8 line-clamp-3">{movie.overview}</p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="flex items-center px-8 py-2 bg-white text-black rounded hover:bg-opacity-80 transition"
            >
              <Play className="w-6 h-6 mr-2" />
              Play
            </button>
            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="flex items-center px-8 py-2 bg-gray-500 bg-opacity-70 text-white rounded hover:bg-opacity-50 transition"
            >
              <Info className="w-6 h-6 mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
