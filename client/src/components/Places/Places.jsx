import './Places.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Places() {
  const navigate = useNavigate();
   const [totalUsers, setTotalUsers] = useState(0);

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
   
     useEffect(() => {
       getTotalUsers();
     }, []);

  return( 
    <div>
      <h1>Results for</h1>
      <p><b>Number of users: </b> {totalUsers}</p>
    </div>
  )
}

export default Places;