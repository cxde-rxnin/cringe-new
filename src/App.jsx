import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/24/outline"; // Import the back arrow icon
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import SearchAnimePage from "./pages/SearchAnimePage";
import FavoritesPage from "./pages/FavoritesPage";
import CategoriesPage from "./pages/CategoriesPage";
import WatchPartyPage from "./pages/WatchPartyPage";

// Loader Component with fade-up animation
function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-center text-5xl font-bold animate-fadeup">
        Welcome to <br /> Entertainment
      </div>
    </div>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State for managing loader screen
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Simulate loading screen (e.g., fetching data or initializing)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
  }, []);

  // Show loader if loading
  if (loading) {
    return <Loader />;
  }

  // Render back button conditionally
  const showBackButton = location.pathname !== "/";

  // Handle back button click and reset the search query
  const handleBackButtonClick = () => {
    setSearchQuery(""); // Clear the search query
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 text-white fixed z-2 w-full bg-neutral-950">
        {showBackButton && (
          <button
            onClick={handleBackButtonClick} // Clear search and navigate back
            className="p-2 rounded-lg mr-2"
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />
          </button>
        )}

        {!showBackButton && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg"
          >
            <Bars3Icon className="w-6 h-6 text-white" />
          </button>
        )}

        <div className="flex-1 mx-4 max-w-xs ml-auto">
          <input
            type="text"
            placeholder="Search for anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/search/${searchQuery}`)
            }
            className="w-full px-4 py-2 rounded-lg bg-zinc-100/5 text-white/90 focus:outline-none"
          />
        </div>
      </header>

      <div className="flex">
        {!(
          location.pathname.includes("/anime/") ||
          location.pathname.includes("/search/")
        ) && (
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/anime/:id" element={<AnimeDetailsPage />} />
            <Route path="/search/:query" element={<SearchAnimePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/watch-party" element={<WatchPartyPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
