import React, { useEffect, useState } from "react";
import { account, databases } from "./appwrite";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import SearchAnimePage from "./pages/SearchAnimePage";
import FavoritesPage from "./pages/FavoritesPage";
import CategoriesPage from "./pages/CategoriesPage";
import WatchPartyPage from "./pages/WatchPartyPage";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    account
      .get()
      .then((response) => {
        setUser(response);
        storeUserProfile(response);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const storeUserProfile = (user) => {
    if (!user) return;

    // Check if user profile already exists
    databases.listDocuments('your_collection_id', [
      Query.equal('email', user.email)
    ])
    .then((response) => {
      if (response.documents.length === 0) {
        // Profile doesn't exist, create a new one
        const userProfile = {
          name: user.name || "No name",
          email: user.email,
          preferences: {},
        };

        databases.createDocument('675756b9000b3db85eda', 'unique()', userProfile)
          .then(response => {
            console.log('User profile created:', response);
          })
          .catch(error => {
            console.error('Error creating user profile:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error checking existing profile:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const location = useLocation();
  const isAnimeDetailsPage = location.pathname.includes("/anime/");
  const isSearchAnimePage = location.pathname.includes("/search/");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen">
      {user && (
        <header className="flex items-center justify-between p-4 text-white fixed z-2 w-full bg-neutral-950">
          {(isAnimeDetailsPage || isSearchAnimePage) && (
            <button className="text-white flex items-center" onClick={() => window.history.back()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          )}

          {!(isAnimeDetailsPage || isSearchAnimePage) && (
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg">
              <Bars3Icon className="w-6 h-6 text-white" />
            </button>
          )}

          <div className="flex-1 mx-4 max-w-xs ml-auto">
            <input
              type="text"
              placeholder="Search for anime..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="w-full px-4 py-2 rounded-lg bg-zinc-100/5 text-white/90 focus:outline-none"
            />
          </div>
        </header>
      )}

      <div className="flex">
        {user && !(isAnimeDetailsPage || isSearchAnimePage) && (
          <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} setUser={setUser} />
        )}

        <div className="flex-1 p-4">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />

            {user ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/anime/:id" element={<AnimeDetailsPage />} />
                <Route path="/search/:query" element={<SearchAnimePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/watch-party" element={<WatchPartyPage />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
