import React from 'react';
import './HomePage.css'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return( 
    <div>
      <h1 className = "title">Productive Places</h1>
      <h2 className = "caption">Let's find your next favorite study spot!</h2>
      <button className="nextBttn">
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
      <button onClick = {() => {navigate("/signup")}} className = "homeBttn">Home</button>
      <button className = "searchingBttn">Search by Filter</button>
      <button className = "placesBttn">Places</button>
      <button className = "contactBttn">Contact</button>
      <button className = "signUpBttn">Sign-Up</button>
      <button className = "signInBttn">Sign-in</button>
      <input type="text" placeholder="Search.." class = "searchBttntwo"></input>
    </div>
  )
}

export default HomePage;
