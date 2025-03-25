import { useState, useEffect } from 'react';
import { getTrending, getTopRated } from '../api/tmdb';
import Row from '../components/Row';

const NewAndPopular = () => {
  // State to store trending and top-rated content
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch trending and top-rated content simultaneously
        const [trending, topRated] = await Promise.all([
          getTrending(),
          getTopRated()
        ]);

        // Update state with fetched content
        setContent({
          trending: trending.data.results,
          topRated: topRated.data.results
        });
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []); // Runs only once when the component mounts

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="space-y-8">
        {/* Display Trending and Top-Rated content */}
        <Row title="Trending This Week" movies={content.trending || []} isLarge />
        <Row title="Top Rated" movies={content.topRated || []} />
      </div>
    </div>
  );
};

export default NewAndPopular;
