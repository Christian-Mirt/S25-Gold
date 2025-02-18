import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_KEY + '/user/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful! Redirecting...');
        navigate('/searchfilter');
      } else {
        alert(`Error: ${data.error || 'Login failed'}`);
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
      console.log("Sent email");
    } else {
      alert("No accounts found");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="loginInfo">
        <form action="">
          <h1 className="loginHeader">Login</h1>
          <input type="email" name="email" placeholder="Email address" required className="email" value={enteredEmail} onChange={(e) => setEnteredEmail(e.target.value)} /><br />
          <input type="password" name="password" placeholder="Password" required className="pass" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
          <label className="remember">
            <input id="rememberme" name="rememberme" value="remember" type="checkbox" />
            Remember Me
          </label><br />
          <a href="#" className="forgot" onClick={handleForgotPassword}>Forgot Password?</a>
        </form>
      </div>
      <h2 className="subtitle">Let's find your next favorite study spot!</h2>
      <div className="card">
        <button type="submit" className="signBttn" onClick={handleSubmit}>Login</button>
      </div>
    </>
  );
}
