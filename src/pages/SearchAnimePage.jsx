// SearchAnimePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SearchAnimePage = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&page=1`);
        setSearchResults(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mb-8">
        {searchResults.length > 0 ? (
          searchResults.map((anime) => (
            <div key={anime.mal_id} className="w-44 h-60 bg-white rounded-lg shadow-lg">
              <Link to={`/anime/${anime.mal_id}`} className="block w-full h-full">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </Link>
            </div>
          ))
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchAnimePage;
