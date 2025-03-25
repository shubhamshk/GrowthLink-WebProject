import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../api/tmdb';

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string;
  original_name: string;
}

interface RowProps {
  title: string;
  movies: Movie[];
  isLarge?: boolean;
}

const Row: React.FC<RowProps> = ({ title, movies, isLarge = false }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4 px-8">{title}</h2>
      <div className="group relative">
        <ChevronLeft
          className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 rounded-full p-2 text-white cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        />
        
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none relative group/item"
            >
              <img
                src={getImageUrl(isLarge ? movie.backdrop_path : movie.poster_path)}
                alt={movie.title || movie.name || movie.original_name}
                className={`rounded-lg border-2 border-gray-800 group-hover/item:border-gray-400 transition-colors ${
                  isLarge ? 'h-64 object-cover' : 'h-72'
                }`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/70 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover/item:opacity-100">
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Play
                  </button>
                  <button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="flex items-center gap-2 bg-gray-500/50 text-white px-4 py-2 rounded-md hover:bg-gray-500/70 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <ChevronRight
          className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 rounded-full p-2 text-white cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  );
};

export default Row;