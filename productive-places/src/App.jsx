import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <h1 class = "Main_Title">Productive Places</h1>
      <div class = "nav_buttons">
        <button class = "Home">Home</button>
        <button class = "search">Search by Filter</button>
        <button class = "places">Places</button>
        <button class = "contact">Contact</button>
        <button class = "signUp">Sign-Up</button>
        <button class = "signIn">Sign-in</button>
      </div>
      <input type="text" placeholder="Search.." class = "searchBttn"></input>
      <div class = "loginInfo">
        <form action = "">
          <h1 class = "signHeader">Sign Up</h1>
          <input type = "text" placeholder='Username' required class = "user"></input><br/>
          <input type = "text" placeholder='Password' required class = "pass"></input><br/>
          <label><input id="rememberme" name="rememberme" value="remember" type="checkbox" />Remember Me</label><br/> 
          <a href = "#" class = "forgot">Forgot Password?</a>
        </form>
      </div>
      <h2 class = "subtitle">Let's Find your favorite study spot</h2>
      <div className="card">
        <button type = "submit" class = "signBttn">Sign Up</button>
      </div>
    </>
  )
}

export default App
