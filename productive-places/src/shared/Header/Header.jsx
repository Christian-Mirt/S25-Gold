import React from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return( 
    <div className = "header">
      <h1 className = "Main_Title">Productive Places</h1>
      <div className = "button-container">
        <button onClick = {() => {navigate("/")}} className = "btn">Home</button>
        <button className = "btn">Search by Filter</button>
        <button className = "btn">Places</button>
        <button className = "btn">Contact</button>
        <button onClick = {() => {navigate("/signup")}} className = "btn">Sign-Up</button>
        <button className = "btn">Sign-in</button>
        <input type="text" placeholder="Search.." className = "search-bar"></input>
      </div>
    </div>
  )
}

export default Header;
