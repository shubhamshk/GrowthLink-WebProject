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
  // State to store different categories of movies
  const [movies, setMovies] = useState<any>({});

  useEffect(() => {
    // Function to fetch all movie categories from the API
    const fetchMovies = async () => {
      try {
        // Fetching multiple categories at once using Promise.all
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

        // Updating the state with fetched movie data
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
        console.error('Error fetching movies:', error); // Log error if fetching fails
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className="relative">
      {/* Display the main banner */}
      <Banner />

      <div className="relative z-20 -mt-16">
        {/* Render different movie categories as rows */}
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
