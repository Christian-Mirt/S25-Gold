import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  return( 
    <div>
      <h1 style={{ color: 'white'}}>Welcome to the Home Page</h1>
      <button onClick = {() => {navigate("/signup")}}>submit</button>
    </div>
  )
}

export default HomePage;
