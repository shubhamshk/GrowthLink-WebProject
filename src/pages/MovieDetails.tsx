import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { getMovieDetails, getSimilarMovies, getImageUrl } from '../api/tmdb';
import Row from '../components/Row';

const MovieDetails = () => {
  // Extract movie ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // State to store movie details
  const [movie, setMovie] = useState<any>(null);
  // State to store a list of similar movies
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);

  // Fetch movie details and similar movies when the component mounts or when ID changes
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          // Fetch movie details and similar movies simultaneously
          const [movieData, similarData] = await Promise.all([
            getMovieDetails(id),
            getSimilarMovies(id),
          ]);
          setMovie(movieData.data); // Store movie details
          setSimilarMovies(similarData.data.results); // Store similar movies list
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };

    fetchData();
  }, [id]); // Re-run effect when the ID changes

  // If movie data is not available yet, return null (prevents errors)
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Movie Poster Section */}
      <div className="relative h-[70vh] mb-8">
        <div className="absolute w-full h-full">
          {/* Background Image */}
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for Better Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        {/* Movie Details Container */}
        <div className="relative h-full container mx-auto px-8 flex items-center">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Movie Poster */}
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-64 rounded-lg border-2 border-gray-800"
            />

            {/* Movie Information */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex items-center mb-4">
                {/* Movie Rating */}
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
                <span className="mx-2">•</span>
                {/* Release Year */}
                <span>{movie.release_date.split('-')[0]}</span>
                <span className="mx-2">•</span>
                {/* Runtime in Minutes */}
                <span>{movie.runtime} min</span>
              </div>

              {/* Movie Overview */}
              <p className="text-gray-300 mb-6">{movie.overview}</p>

              {/* Play Button */}
              <button className="flex items-center px-6 py-2 bg-red-600 rounded-md hover:bg-red-700 transition">
                <Play className="w-5 h-5 mr-2" />
                Play
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Movie Details Section */}
      <div className="container mx-auto px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">More Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Genres */}
            <div>
              <h3 className="text-lg font-medium mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Production Companies */}
            <div>
              <h3 className="text-lg font-medium mb-2">Production Companies</h3>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company: any) => (
                  <span key={company.id} className="text-gray-300">
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
          <Row movies={similarMovies} title="" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
