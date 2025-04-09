import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import FavoritesList from "./components/FavoritesList";
import "./App.css";

/**
 * Main App component that manages the state and data flow of the application
 * Handles search functionality, favorites management, and API calls
 */
const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
      console.error("Error initializing favorites:", e);
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Effect for saving favorites to local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Debounced search function to avoid excessive API calls
   * Only triggers the search after the user stops typing for 500ms
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 500); // 500ms debounce time

    // Cleanup function to clear timeout if component unmounts or searchTerm changes
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  /**
   * Fetches search results from API based on the search term
   * @param {string} term - The search term to query the API with
   */
  const fetchSearchResults = async (term) => {
    setIsLoading(true);
    setSearchResults([]);
    setError(null);

    try {
      // JSONPlaceholder API
      //   const response = await fetch(
      //     `https://jsonplaceholder.typicode.com/posts?q=${term}`
      //   );

      const response = await fetch("http://localhost:3001/items");

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const allItems = await response.json();

      // Filter items locally based on search term
      const filteredItems = allItems.filter((item) => {
        // Case-insensitive search in title and body
        const searchTermLower = term.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchTermLower) ||
          item.body.toLowerCase().includes(searchTermLower) || 
          item.category.toLowerCase().includes(searchTermLower)
        );
      });

      console.log("Filtered results:", filteredItems);
      setSearchResults(filteredItems);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      // Reset loading and searching states
      setIsLoading(false);
    }
  };

  /**
   * Adds an item to favorites if it doesn't already exist
   * Wrapping with useCallback to prevent recreation on every render
   * @param {Object} item - The item to add to favorites
   */
  const addToFavorites = useCallback((item) => {
    setFavorites((prevFavorites) => {
      // Check if item already exists in favorites
      if (!prevFavorites.some((favorite) => favorite.id === item.id)) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  }, []);

  /**
   * Handles removing an item from favorites
   * Wrapping with useCallback to prevent recreation on every render
   * @param {number} id - The id of the item to remove from favorites
   */
  const removeFromFavorites = useCallback((id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  }, []);

  /**
   * Handles changes to the search input field
   * @param {string} term - The input change event
   */
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Search and Favorites App</h1>
      </header>

      <main className="app-main">
        <section className="search-section">
          <SearchBar onSearch={handleSearch} />

          {error && <div className="error-message">Error: {error}</div>}

          {isLoading ? (
            <div className="loading">Loading results...</div>
          ) : (
            <ResultsList
              results={searchResults}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
            />
          )}
        </section>

        <section className="favorites-section">
          <FavoritesList
            favorites={favorites}
            onRemoveFromFavorites={removeFromFavorites}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
