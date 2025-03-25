import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { getMovieDetails, getSimilarMovies, getImageUrl } from '../api/tmdb';
import Row from '../components/Row';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const [movieData, similarData] = await Promise.all([
            getMovieDetails(id),
            getSimilarMovies(id)
          ]);
          setMovie(movieData.data);
          setSimilarMovies(similarData.data.results);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="relative h-[70vh] mb-8">
        <div className="absolute w-full h-full">
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        
        <div className="relative h-full container mx-auto px-8 flex items-center">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-64 rounded-lg border-2 border-gray-800"
            />
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
                <span className="mx-2">•</span>
                <span>{movie.release_date.split('-')[0]}</span>
                <span className="mx-2">•</span>
                <span>{movie.runtime} min</span>
              </div>
              <p className="text-gray-300 mb-6">{movie.overview}</p>
              <button className="flex items-center px-6 py-2 bg-red-600 rounded-md hover:bg-red-700 transition">
                <Play className="w-5 h-5 mr-2" />
                Play
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">More Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
          <Row movies={similarMovies} title="" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;