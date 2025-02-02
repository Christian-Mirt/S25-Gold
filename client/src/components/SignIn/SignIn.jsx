import './SignIn.css'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function SignIn() {

  const navigate = useNavigate();
  const id = 1;
  const [user, setUser] = useState(null);

  const getUser = async (userId) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_KEY + `/user/${userId}`);
      const result = await response.json();

      if (response.ok) {
        setUser(result.data[0]);
        console.log(result);
      } else {
        console.error("Error fetching user:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return (
    <>
      <div className="loginInfo">
        <form action="">
          <h1 className="loginHeader">Login</h1>
          <input type="text" placeholder='Username' required className="user"></input><br />
          <input type="password" placeholder='Password' required className="pass"></input><br /><br />
          <label className="remember"><input id="rememberme" name="rememberme" value="remember" type="checkbox" />Remember Me</label><br />
          <a href="#" className="forgot">Forgot Password?</a>
        </form>
      </div>
      <h2 className="subtitle">Let's find your next favorite study spot!</h2>
      <div className="card">
        <button type="submit" className="signBttn">Login</button>
      </div>
      <div>
        <p><b>First name: </b> {user ? user.first_name : "First Name"}</p>
      </div>
    </>
  );

}

