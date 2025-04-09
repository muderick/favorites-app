import React from "react";

/**
 * ResultsList component to display search results
 * @param {Object} props - Component props
 * @param {Array} props.results - Array of search result items
 * @param {Function} props.onAddToFavorites - Callback function to add item to favorites
 * @param {Array} props.favorites - Current list of favorite items
 */
const ResultsList = ({ results, onAddToFavorites, favorites }) => {
  /**
   * Checks if an item is already in favorites
   * @param {number} id - The id of the item to check
   * @returns {boolean} - Whether the item is in favorites
   */
  const isInFavorites = (id) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  /**
   * Handles click on the "Add to favorites" button
   * @param {Object} item - The item to add to favorites
   */
  const handleAddToFavorites = (item) => {
    if (!isInFavorites(item.id)) {
      onAddToFavorites(item);
    }
  };
  // Check if results is an array, if not use an empty array
  const resultsArray = Array.isArray(results) ? results : [];
  console.log(resultsArray)
  return (
    <div className="results-list">
      <h2>Search Results</h2>

      {resultsArray.length === 0 ? (
        <p className="no-results">
          No results to display. Try Searching for something.
        </p>
      ) : (
        <ul className="results">
          {resultsArray.map((item) => (
            <li key={item.id} className="result-item">
              <div className="result-content">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <button
                onClick={() => handleAddToFavorites(item)}
                disabled={isInFavorites(item.id)}
                className={`favorite-button ${
                  isInFavorites(item.id) ? "added" : ""
                }`}
              >
                {isInFavorites(item.id)
                  ? "Added to Favorites"
                  : "Add to Favorites"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsList;
