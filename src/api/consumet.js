import axios from "axios";

const BASE_URL = "https://api.consumet.org"; // Base URL for Consumet API

// Fetch anime list by category
export const fetchAnimeList = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/gogoanime`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return null;
  }
};

export const fetchTrendingAnime = async () => {
    const response = await fetch("https://api.consumet.org/anime/gogoanime/top-airing"); // Replace with correct Consumet API endpoint
    const data = await response.json();
    return data; // Return the response with anime titles and images
  };

// Fetch anime details by anime ID
export const fetchAnimeDetails = async (animeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/${animeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return null;
  }
};

// Fetch episodes for a particular anime
export const fetchEpisodes = async (animeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/${animeId}/episodes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return null;
  }
};
