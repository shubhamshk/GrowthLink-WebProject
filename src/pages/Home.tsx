import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import {
  getTrending,
  getNetflixOriginals,
  getTopRated,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getDocumentaries
} from '../api/tmdb';

const Home = () => {
  const [movies, setMovies] = useState<any>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          trending,
          netflixOriginals,
          topRated,
          actionMovies,
          comedyMovies,
          horrorMovies,
          romanceMovies,
          documentaries
        ] = await Promise.all([
          getTrending(),
          getNetflixOriginals(),
          getTopRated(),
          getActionMovies(),
          getComedyMovies(),
          getHorrorMovies(),
          getRomanceMovies(),
          getDocumentaries()
        ]);

        setMovies({
          trending: trending.data.results,
          netflixOriginals: netflixOriginals.data.results,
          topRated: topRated.data.results,
          actionMovies: actionMovies.data.results,
          comedyMovies: comedyMovies.data.results,
          horrorMovies: horrorMovies.data.results,
          romanceMovies: romanceMovies.data.results,
          documentaries: documentaries.data.results
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative">
      <Banner />
      <div className="relative z-20 -mt-16">
        <Row title="Trending Now" movies={movies.trending || []} isLarge />
        <Row title="Netflix Originals" movies={movies.netflixOriginals || []} />
        <Row title="Top Rated" movies={movies.topRated || []} />
        <Row title="Action Movies" movies={movies.actionMovies || []} />
        <Row title="Comedy Movies" movies={movies.comedyMovies || []} />
        <Row title="Horror Movies" movies={movies.horrorMovies || []} />
        <Row title="Romance Movies" movies={movies.romanceMovies || []} />
        <Row title="Documentaries" movies={movies.documentaries || []} />
      </div>
    </div>
  );
};

export default Home;