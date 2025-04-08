import './SearchFilter.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function SearchFilter() {
  const navigate = useNavigate();
  const [rating, setRating] = useState('');
  const [wifi, setWifi] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const searchPlace = () =>{
    navigate(`/places?search=${searchTerm}&rating=${rating}&wifi=${wifi}`);
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleWifiChange = (event) => {
    setWifi(event.target.value); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchPlace();
    }
  };

  return( 
    <div className='center-vertically'>
      <div className='center-horizontally'>
        <input 
          type="text" 
          placeholder="Search for a place..." 
          className="bigSearch"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <h1 className='browseHeader'>Or browse using the filters below</h1>
        <select type="text" placeholder="Rating" className = "rating" value={rating} onChange={handleRatingChange}>
          <option value="" selected disabled>Rating</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <select type="text" placeholder="Hours" className = "hours">
          <option value="" selected disabled>Hours</option>
          <option value="1">Option 1</option>
        </select>
        <select type="text" placeholder="Wifi" className = "wifi" value={wifi} onChange={handleWifiChange}>
          <option value="" selected disabled>Wifi Availability</option>
          <option value="true">Has WiFi</option>
          <option value="false">No WiFi</option>
        </select>
        <select type="text" placeholder="Location" className = "loc">
          <option value="" selected disabled>Location</option>
          <option value="1">Option 1</option>
        </select>
        <select type="text" placeholder="Popular Times" className = "pop">
          <option value="" selected disabled>Popular Times</option>
          <option value="1">Option 1</option>
        </select>
        <select type="text" placeholder="Food & Drink" className = "food">
          <option value="" selected disabled>Food & Drink</option>
          <option value="1">Option 1</option>
        </select>
        <button className='searchButton' onClick={searchPlace}>Search</button>
      </div>
    </div>
  )
}

export default SearchFilter;