import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/top/anime"); 
        setTrendingAnime(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending anime:", error);
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20 lg:pl-56">
      <h2 className="text-4xl font-bold mb-8">Trending Anime</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mb-8">
        {trendingAnime.slice(0, 100).map((anime) => (
          <div
            key={anime.mal_id}
            className="w-44 h-60 bg-white rounded-lg shadow-lg"
          >
            <Link
              to={`/anime/${anime.mal_id}`}
              className="block w-full h-full"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
