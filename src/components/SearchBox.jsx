import React, { useState, useContext } from 'react';
import { FcSearch } from "react-icons/fc";
import { Mycontext } from '../App'; // Import context
import "../index.css";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // Store location suggestions
  const { fetchLocationData } = useContext(Mycontext); // Get function from context
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY; // API Key for location search

  // Fetch location suggestions
  const fetchSuggestions = async (query) => {
    if (query.length < 3) { // Only search if 3+ characters
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${weatherApiKey}`
      );
      const data = await response.json();
      setSuggestions(data || []); // Store location suggestions safely
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]); // Clear suggestions on error
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') return; // Prevent empty search
    
    fetchLocationData(searchQuery.trim()); // Fetch AQI & weather for searched location
    setSearchQuery(''); // Clear input field
    setSuggestions([]); // Clear suggestions
  };

  // Handle selecting a suggested location
  const handleSelectSuggestion = (location) => {
    setSearchQuery(location.name); // Update search input with selected location
    fetchLocationData(location.name); // Fetch data for selected location
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className='position-relative'>
      <form onSubmit={handleSearch} className='searchBox d-flex align-items-center'>
        <FcSearch className='mr-2 searchIcon' onClick={handleSearch} style={{ cursor: 'pointer' }} />
        <input 
          type="text" 
          placeholder='Search location...' 
          value={searchQuery} 
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
      </form>

      {/* Location Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((location, index) => (
            <li key={index} onClick={() => handleSelectSuggestion(location)}>
              {location.name}, {location.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;

