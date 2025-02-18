import './Places.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Places() {
  const navigate = useNavigate();
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [allPlaces, setPlaces] = useState(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);


     const getTotalPlaces = async () => {
       const result = await fetch(import.meta.env.VITE_API_KEY + '/place/tps', {
         method: "GET",
         headers: {
           'content-type': 'application/json',
         },
       });
   
       const data = await result.json();
   
       if (data.status === 200) {
         console.log(data);
         setTotalPlaces(data.data);
       } else {
         console.log("Error fetching total places");
       }
     };

     const getPlaces = async () => {
      const url = import.meta.env.VITE_API_KEY + '/place/catalogs';
      console.log(url);

      const response = await fetch(import.meta.env.VITE_API_KEY + '/place/catalogs', {
        method: "GET",
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      
      if (data.status === 200) {
        console.log(data);
        setPlaces(data.data);
        getSelectedPlaceDetails(data.data[0].place_id);
      } else {
        console.log("Error fetching places");
      }
    };

    const getSelectedPlaceDetails = async (placeId) => {
      const url = import.meta.env.VITE_API_KEY + '/place/reviews';
      console.log(url);

      const formBody = JSON.stringify({
        id: placeId,
      })

      const response = await fetch(url, {
        method: "GET",
        body: formBody,
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      
      if (data.status === 200) {
        console.log(data);
        setSelectedPlaceDetails(data.data);
      } else {
        console.log("Error fetching place details");
      }
    };
  
   
     useEffect(() => {
       getPlaces();
       getTotalPlaces();
     }, []);

  return( 
    <div className='page-container'>
      <div className="places-catalog">
        <h1>Places Catalog</h1>
        <p><b>Number of places: </b> {totalPlaces}</p>
        <hr width="100%" size="2" color="white" noshade></hr>
        {allPlaces ? (
        <table>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Place</th>
              <th>Location</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {allPlaces.map((place, index) => (
              <tr key={index}>
                <td>
                  <div className="star-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">&#9733;</span> // Unicode star
                      ))}
                    </div>
                    <div className="stars filled" style={{ width: `${(place.overall_rating / 5) * 100}%` }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">&#9733;</span> // Unicode star
                      ))}
                    </div>
                  </div>
                </td>
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
      <div className='place-details'>
        <h1>Reviews</h1>
        <div>
          <h4>User Manny Pacquiao says:</h4>
          <p>This place was not good.</p>
          <p>{selectedPlaceDetails}</p>
        </div>
      </div>
    </div>
  )
}

export default Places;