import './Places.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function Places() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ratingParam = queryParams.get('rating');
  const wifiParam = queryParams.get('wifi');

  const [totalPlaces, setTotalPlaces] = useState(0);
  const [allPlaces, setPlaces] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [alphabeticalOrder, setAlphabeticalOrder] = useState('asc');

  const getTotalPlaces = async () => {
    const result = await fetch(import.meta.env.VITE_API_KEY + '/place/tps', {
      method: "GET",
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await result.json();
    if (data.status === 200) {
      setTotalPlaces(data.data);
    } else {
      console.log("Error fetching total places");
    }
  };

  const getPlaces = async () => {
    const url = import.meta.env.VITE_API_KEY + '/place/catalogs';
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.status === 200) {
      setPlaces(data.data);
      // selects the first place in the list
      selectPlace(data.data[0]);
      filterPlaces(data.data, ratingParam, wifiParam);
    } else {
      console.log("Error fetching places");
    }
  };

  const selectPlace = async (place) => {
    // Animation stuff
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);

    setSelectedPlace(place);
    getSelectedPlaceDetails(place.place_id);
  };

  const getSelectedPlaceDetails = async (placeId) => {
    const url = import.meta.env.VITE_API_KEY + '/place/reviews';
    const response = await fetch(url + '?place_id=' + placeId, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.status === 200) {
      setSelectedPlaceDetails(data.data);
    } else {
      console.log("Error fetching place details");
    }
  };

  const filterPlaces = (places, rating, wifi) => {
    let filtered = places;

    if (rating) {
      filtered = places.filter((place) => place.overall_rating >= parseFloat(rating));
    } 
    
    if (wifi) {
      filtered = filtered.filter((place) => place.wifi_quality === wifi);
    }

    setFilteredPlaces(filtered);
  };

  const handleSortByRating = () => {
    const sortedPlaces = [...filteredPlaces].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.overall_rating - b.overall_rating;
      } else {
        return b.overall_rating - a.overall_rating; 
      }
    });
  
    setFilteredPlaces(sortedPlaces);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortAlphabetically = () => {
    const sortedPlaces = [...filteredPlaces].sort((a, b) => {
      if (alphabeticalOrder === 'asc') {
        return a.name.localeCompare(b.name); // Sort A-Z
      } else {
        return b.name.localeCompare(a.name); // Sort Z-A
      }
    });

    setFilteredPlaces(sortedPlaces); // Update the sorted list
    setAlphabeticalOrder(alphabeticalOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };

  useEffect(() => {
    getPlaces();
    getTotalPlaces();
  }, [ratingParam, wifiParam]);

  return (
    <div className='page-container'>

      <div className="places-catalog">
        <h1>Places Catalog</h1>
        <p><b>Number of places: </b> {totalPlaces}</p>
        <hr width="100%" size="2" color="white" noshade></hr>
        {filteredPlaces.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th onClick={handleSortByRating} style={{ cursor: 'pointer' }}>Rating {sortOrder === 'asc' ? '↑' : '↓'}</th>
                <th onClick={handleSortAlphabetically} style={{ cursor: 'pointer' }}>Place {alphabeticalOrder === 'asc' ? '↑' : '↓'}</th>
                <th>Location</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((place, index) => (
                <tr key={index} onClick={() => selectPlace(place)} className={selectedPlace?.place_id === place.place_id ? "selected" : ""}>
                  <div className="star-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">&#9733;</span> // Unicode star
                      ))}
                    </div>
                    <div className="stars filled" style={{ width: `${(place.overall_rating / 5) * 100}%` }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">&#9733;</span>
                      ))}
                    </div>
                  </div>
                  <td>{place.name}</td>
                  <td>{place.city}: {place.address}</td>
                  <td>{place.hours ? place.hours : 'Hours not found'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No places available</p>
        )}
      </div>
      
      <div className={`place-details ${isRefreshing ? "refreshing" : ""}`}>
        {selectedPlace && selectedPlaceDetails ? (
          <div>
            <h1>{selectedPlace.name} Reviews</h1>
            {selectedPlaceDetails.map((review, index) => (
              <div key={index}>
                <h2>{review.first_name + ' ' + review.last_name}</h2>
                <div className="star-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">&#9733;</span>
                    ))}
                  </div>
                  <div className="stars filled" style={{ width: `${(review.num_stars / 5) * 100}%` }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">&#9733;</span>
                    ))}
                  </div>
                </div>
                <h3>{review.comment}</h3>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <h2>This place does not have any reviews yet.</h2>
        )}
      </div>
    </div>
  );
}

export default Places;
