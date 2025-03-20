import './Places.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function Places() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ratingParam = queryParams.get('rating');
  const wifiParam = queryParams.get('wifi');

  const [allPlaces, setPlaces] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPlaceAmenities, setSelectedPlaceAmenities] = useState(null);
  const [selectedPlaceReviews, setSelectedPlaceReviews] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [alphabeticalOrder, setAlphabeticalOrder] = useState('asc');
  const [favoritePlaces, setFavoritePlaces] = useState([]);

  const [user, setUser] = useState(null); //for user id

  //fetch user data
  const getUser = async (userId) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_KEY + `/user/${userId}`);
      const result = await response.json();

      if (response.ok) {
        setUser(result.data[0]);
      } else {
        console.error("Error fetching user:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
      const userId = localStorage.getItem('userId');
      getUser(userId);
  }, [navigate]);

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
    const url = import.meta.env.VITE_API_KEY + '/place/';
    // Get the amenities
    const amenitiesResponse = await fetch(url + 'amenities?place_id=' + placeId, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
      },
    });

    const amenities = await amenitiesResponse.json();
    if (amenities.status === 200) {
      setSelectedPlaceAmenities(amenities.data[0]);
      console.log(amenities.data[0]);
    } else {
      console.log("Error fetching place details");
    }

    // Get the reviews
    const reviewsResponse = await fetch(url + 'reviews?place_id=' + placeId, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
      },
    });

    const reviews = await reviewsResponse.json();
    if (reviews.status === 200) {
      setSelectedPlaceReviews(reviews.data);
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

  const addHeart = (placeId) => {
    setFavoritePlaces((prevFavorites) => {
      if (prevFavorites.includes(placeId)) {
        return prevFavorites.filter((id) => id !== placeId);
      } else {
        return [...prevFavorites, placeId];
      }
    });
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
  }, [ratingParam, wifiParam]);

  return (
    <div className='page-container'>

      <div className="places-catalog">
        <h1>Places Catalog</h1>
        <p><b>Number of places: </b> {filteredPlaces.length}</p>
        <hr width="130%" size="2" color="white" noshade></hr>
        {filteredPlaces.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th onClick={handleSortByRating} style={{ cursor: 'pointer' }}>Rating {sortOrder === 'asc' ? '↑' : '↓'}</th>
                <th onClick={handleSortAlphabetically} style={{ cursor: 'pointer' }}>Place {alphabeticalOrder === 'asc' ? '↑' : '↓'}</th>
                <th>Location</th>
                <th>Hours</th>
                <th>Favorites</th>
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
                  <div className="hearts">
                    <span className="heart" onClick={(e) => { e.stopPropagation(); addHeart(place.place_id); navigate(`/favorites/${user?.id}`)}} style={{ cursor: 'pointer', color: favoritePlaces.includes(place.place_id) ? 'red' : 'grey' }}>
                      {favoritePlaces.includes(place.place_id) ? '❤️' : '🤍'}
                    </span>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No places available</p>
        )}
      </div>
      
      <div className={`place-details ${isRefreshing ? "refreshing" : ""}`}>
        {selectedPlace ? (
          <div>
            <h1>{selectedPlace.name} Details</h1>
            <h2>Amenities</h2>
            {selectedPlaceAmenities ? (
              <ul>
                {selectedPlaceAmenities.has_wifi ? <li><b>Free WiFi</b></li> : <></>}
                {selectedPlaceAmenities.has_outlets ? <li><b>Available power outlets</b></li> : <></>}
                {selectedPlaceAmenities.has_tables ? <li><b>Table space and seating available</b></li> : <></>}
                {selectedPlaceAmenities.group_friendly ? <li><b>Group friendly</b></li> : <></>}
                <li>Noise level: <b>{selectedPlaceAmenities.noise_level}</b></li>
              </ul>
            ) : (
              <p>No amenities found</p>
            )}
            <hr />
            {selectedPlaceReviews ? (
              <div>
                <h2>User Reviews</h2>
                {selectedPlaceReviews.map((review, index) => (
                  <div key={index}>
                    <h3>{review.first_name + ' ' + review.last_name}</h3>
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
                    <h4>{review.comment}</h4>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <h2>This place does not have any reviews yet.</h2>
            )}
          </div>
        ) : (
          <h1>No place selected</h1>
        )}
      </div>
    </div>
  );
}

export default Places;
