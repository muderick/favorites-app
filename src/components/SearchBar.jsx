import React, { useState } from "react";

/**
 * SearchBar component for user input
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback function triggered when search input changes
 */
const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    /**
   * Handles changes to the search input field
   * @param {Event} event - The input change event
   */
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        
        // Call the onSearch function with the new value
        // This will trigger the search functionality in the parent component
        onSearch(newValue); // Call the onSearch function passed as a prop
    }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search items..."
        value={inputValue}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
