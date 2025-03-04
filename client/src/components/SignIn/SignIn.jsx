import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState('');

  const handleLogin = async (e) => {

    e.preventDefault();

    const formBody = JSON.stringify({
      email: enteredEmail,
      password: enteredPassword
    })

    try {
      const result = await fetch(import.meta.env.VITE_API_KEY + '/user/login', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await result.json();

      if (data.status == 200) {
        console.log(data);

        navigate(`/profile`);

      } else {
        alert('Email or password is incorrect');
      }
    } catch (error) {
      console.error('Error logging in up:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (enteredEmail == "") {
      alert("Please enter a valid email address");
      return;
    }

    const formBody = JSON.stringify({
      email: enteredEmail,
    })

    const result = await fetch(import.meta.env.VITE_API_KEY + '/user/reset-password', {
      method: "PUT",
      body: formBody,
      headers: {
        'content-type': 'application/json'
      }
    });

    const data = await result.json();

    console.log(data);

    if (data.status == 200) {
      alert("Please check your email!");
    } else {
      alert("No accounts found");
    }
  };

  return (
    <>
      <div className='center-vertically'>
        <div className='center-horizontally'>
          <div className="loginInfo">
            <form action="">
              <h1 className="loginHeader">Login</h1>
              <input type="email" name="email" placeholder="Email address" required className="user" value={enteredEmail} onChange={(e) => setEnteredEmail(e.target.value)} /><br />
              <input type="password" name="password" placeholder="Password" required className="pass" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} /><br /><br />
              <label className="remember">
                <input id="rememberme" name="rememberme" value="remember" type="checkbox" />
                Remember Me
              </label><br />
              <a href="#" className="forgot" onClick={handleForgotPassword}>Forgot Password?</a>
            </form>
          </div>
          <h2 className="subtitle">Let's find your next favorite study spot!</h2>
          <div className="card">
            <button type="submit" className="signBttn" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}