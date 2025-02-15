import './Places.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Places() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [allPlaces, setPlaces] = useState(null);

     const getTotalUsers = async () => {
       const result = await fetch(import.meta.env.VITE_API_KEY + '/user/tps', {
         method: "POST",
         headers: {
           'content-type': 'application/json',
         },
       });
   
       const data = await result.json();
   
       if (data.status === 200) {
         setTotalUsers(data.data);
       } else {
         console.log("Error fetching total users");
       }
     };

     const getPlaces = async () => {
      const url = import.meta.env.VITE_API_KEY + '/user/catalogs';
      console.log(url);

      const response = await fetch(import.meta.env.VITE_API_KEY + '/user/catalogs', {
        method: "GET",
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      
      if (data.status === 200) {
        console.log(data);
        setPlaces(data.data);
      } else {
        console.log("Error fetching user");
      }
    };
  
   
     useEffect(() => {
       getPlaces();
       getTotalUsers();
     }, []);

  let ratingNum = 0;
  return( 
    <div className="placesCatalog">
      <h1>Places Catalog</h1>
      <p><b>Number of places: </b> {totalUsers}</p>
      <hr width="100%" size="2" color="white" noshade></hr>
      {allPlaces ? (
      <ul>
        {allPlaces.map((place, index) => (
          <div key={index}>
            <p> {place.name}: &nbsp; {place.overall_rating}</p>
            <hr width="100%" size="2" color="white" noshade></hr>
          </div>
        ))}
      </ul>
    ) : (
      <p>No places available</p>
    )}
    </div>
  )
}

export default Places;