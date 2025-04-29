# React Search and Favorites App - Implementation Documentation

## Overview
This project implements a React web application that allows users to search for items from an API, display the results, and manage a list of favorite items. The implementation includes debounced search functionality to prevent excessive API calls while typing, separate display sections for search results and favorites, and local storage persistence for favorites.

## Key Features

### 1. Debounced Search
- Implemented using `useEffect` with a timeout in the `App` component
- Delays API calls by 500ms after the user stops typing
- Prevents excessive API requests during continuous typing
- Improves performance and reduces server load

### 2. Favorites Management
- Add items to favorites from search results
- Remove items from favorites
- Persistent storage using localStorage
- Visual indication of items already in favorites

### 3. Component Structure
The application follows a modular component structure:
- **App.jsx**: Main component that manages state and data flow
- **SearchBar.jsx**: Input component for search queries
- **ResultsList.jsx**: Displays search results with add-to-favorites functionality
- **FavoritesList.jsx**: Displays and manages favorite items

### 4. State Management
- Uses React's `useState` for component-level state management
- Main states in App.js:
  - `searchResults`: Stores API response data
  - `favorites`: Stores user's favorite items
  - `isLoading`: Tracks API request status
  - `searchTerm`: Tracks current search input
  - `error`: Stores any error messages from API calls

### 5. API Integration
- Fetches mock data from MockApi.json (for demonstration) using json-server to watch backend
- Properly handles loading states and errors
- Alternatively you can use JSONPlaceholder mock API for the demo

### 6. Responsive Design
- Mobile-first approach with CSS Grid
- Responsive layout that adjusts to different screen sizes
- Clean, modern UI with appropriate visual feedback

## Technical Implementation Details

### Debounce Implementation
```javascript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, 500); // 500ms debounce time

  return () => clearTimeout(timeoutId);
}, [searchTerm]);
```

This implementation:
1. Creates a timeout when the `searchTerm` changes
2. Clears any previous timeout to reset the delay
3. Only executes the search after 500ms of inactivity
4. Cleans up the timeout if the component unmounts or `searchTerm` changes again

### Favorites Persistence
```javascript
// Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
      console.error("Error initializing favorites:", e);
      return [];
    }
  });

// Save favorites to localStorage when they change
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);
```

This implementation:
1. Retrieves saved favorites when the app loads
2. Updates localStorage whenever the favorites list changes
3. Ensures favorites persist across browser sessions

### Error Handling
The app implements better error handling:
1. API error catching with user-friendly messages
2. Loading states with visual indicators
3. Empty state handling for both search results and favorites

## Mock API Setup
The implementation includes procedure for setting up a local mock API using json-server:
1. Install json-server: `npm install -g json-server`
2. Run the server with the mock data: `json-server --watch MockApi.js --port 3001`
3. Update the fetch URL in `App.js` to use the local server: `http://localhost:3001/items?q=${term}`

## Best Practices Implemented

### 1. Code Organization
- Modular component architecture
- Proper file structure

### 2. Performance Optimization
- Debounced search to reduce API calls
- Conditional rendering to improve rendering performance
- Appropriate use of React hooks

### 3. User Experience
- Loading states and error messages
- Visual feedback for user actions
- Responsive design for all device sizes

### 4. Accessibility
- Semantic HTML structure
- Clear button labels
- Sufficient color contrast

### 5. Documentation
- Comprehensive JSDoc (JavaScript Documentation) comments
- Clear component and function descriptions
- Explanation of important implementation details

## Testing
To test this application:

1. Clone the application to local environment
2. Install json-server: `npm install -g json-server`
3. Run `npm install or npm i`
4. Run the server with the mock data on a separate terminal: `json-server --watch mockApi.json --port 3001` keep the terminal open
5. Run the main application using `npm start`
6. Try searching for various terms to see the debounced search in action
7. Add items to favorites and verify they appear in the favorites section
8. Remove items from favorites
9. Refresh the page to verify favorites persistence
10. Test on different screen sizes to verify responsive design