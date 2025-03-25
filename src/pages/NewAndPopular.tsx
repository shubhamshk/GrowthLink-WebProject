import  { useState, useEffect } from 'react';
import { getTrending, getTopRated } from '../api/tmdb';
import Row from '../components/Row';

const NewAndPopular = () => {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [trending, topRated] = await Promise.all([
          getTrending(),
          getTopRated()
        ]);

        setContent({
          trending: trending.data.results,
          topRated: topRated.data.results
        });
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="space-y-8">
        <Row title="Trending This Week" movies={content.trending || []} isLarge />
        <Row title="Top Rated" movies={content.topRated || []} />
      </div>
    </div>
  );
};

export default NewAndPopular;