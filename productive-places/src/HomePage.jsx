import React from 'react';
import './HomePage.css'
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  return( 
    <div>
      <h1 className = "title">Productive Places</h1>
      <h2 className = "caption">Let's Find your favorite study spot</h2>
      <button className="nextBttn"></button>
      <button onClick = {() => {navigate("/signup")}}>submit</button>
    </div>
  )
}

export default HomePage;
