import React from "react";

/**
 * FavoritesList component to display favorite items
 * @param {Object} props - Component props
 * @param {Array} props.favorites - Array of favorite items
 * @param {Function} props.onRemoveFromFavorites - Callback function to remove item from favorites
 */
const FavoritesList = ({ favorites, onRemoveFromFavorites }) => {
  /**
   * Handles click on the "Remove" button
   * @param {number} id - The id of the item to remove
   */

  const handleRemove = (id) => {
    onRemoveFromFavorites(id);
  };

  return (
    <div className="favorites-list">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorites added yet.</p>
      ) : (
        <ul className="favorites">
          {favorites.map((item) => (
            <li key={item.id} className="favorite-item">
              <div className="favorite-content">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>

              <button onClick={() => handleRemove(item.id)} className="remove-button">
                Remove from Favorites!
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
