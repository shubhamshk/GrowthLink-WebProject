import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDI4MmFlZDQxMWMyNjMzNWI1NTMwMmE0YWJjNGNmMiIsIm5iZiI6MTcxMjMwMTk1MS43NDgsInN1YiI6IjY2MGZhNzdmNGE0YmY2MDE3YzI4OTM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Itq5DGl2nX2owxxCT1BHpBFxQE_uCRy5XpLkR9eQV4I'
  }
});

export const getTrending = () => tmdbAxios.get('/trending/all/week');
export const getNetflixOriginals = () => tmdbAxios.get('/discover/tv?with_networks=213');
export const getTopRated = () => tmdbAxios.get('/movie/top_rated');
export const getActionMovies = () => tmdbAxios.get('/discover/movie?with_genres=28');
export const getComedyMovies = () => tmdbAxios.get('/discover/movie?with_genres=35');
export const getHorrorMovies = () => tmdbAxios.get('/discover/movie?with_genres=27');
export const getRomanceMovies = () => tmdbAxios.get('/discover/movie?with_genres=10749');
export const getDocumentaries = () => tmdbAxios.get('/discover/movie?with_genres=99');
export const getMovieDetails = (id: string) => tmdbAxios.get(`/movie/${id}`);
export const getSimilarMovies = (id: string) => tmdbAxios.get(`/movie/${id}/similar`);
export const searchContent = (query: string) => 
  tmdbAxios.get(`/search/multi?query=${encodeURIComponent(query)}`);

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') =>
  `${TMDB_IMAGE_BASE_URL}/${size}${path}`;