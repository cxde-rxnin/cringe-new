import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnimeDetails(response.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!animeDetails) {
    return <div>No details available for this anime.</div>; 
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <img
            src={animeDetails.images.jpg.image_url}
            alt={animeDetails.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{animeDetails.title}</h1>
          <p className="text-lg mb-4">{animeDetails.synopsis}</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Episodes:</strong> {animeDetails.episodes || "N/A"}
            </div>
            <div>
              <strong>Score:</strong> {animeDetails.score || "N/A"}
            </div>
            <div>
              <strong>Genres:</strong> {animeDetails.genres?.map((genre) => genre.name).join(", ") || "N/A"}
            </div>
            <div>
              <strong>Status:</strong> {animeDetails.status || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
