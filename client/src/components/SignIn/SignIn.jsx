import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const target_id = 1;
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_KEY + '/user/signIn', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({first_name: firstName, password: password})
      });

      const data = await response.json();

      if (response.ok) {
          alert('Sign-up successful! Redirecting...');
          navigate('/searchfilter');
      } else {
          alert(`Error: ${data.error || 'Sign-up failed'}`);
      }
  } catch (error) {
      console.error('Error signing up:', error);
      alert('Something went wrong. Please try again.');
  }
};

  const getUser = async () => {
    const formBody = JSON.stringify({ id: target_id });

    const login = await fetch(import.meta.env.VITE_API_KEY + '/user/', {
      method: "POST",
      body: formBody,
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await result.json();

    if (data.status === 200) {
      console.log(data);
      setUser(data.data[0]);
    } else {
      console.log("Error fetching user");
    }
  };

  const getTotalUsers = async () => {
    const result = await fetch(import.meta.env.VITE_API_KEY + '/user/total', {
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
    getUser();
    getTotalUsers();
  }, []);

  return (
    <>
      <div className="loginInfo">
        <form action="">
          <h1 className="loginHeader">Login</h1>
          <input type="text" name="first_name" placeholder="Username" required className="user" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br />
          <input type="password" name="password" placeholder="Password" required className="pass" value={password} onChange={(e) => setPassword(e.target.value)}/><br /><br />
          <label className="remember">
            <input id="rememberme" name="rememberme" value="remember" type="checkbox" />
            Remember Me
          </label><br />
          <a href="#" className="forgot">Forgot Password?</a>
        </form>
      </div>
      <h2 className="subtitle">Let's find your next favorite study spot!</h2>
      <div className="card">
        <button type="submit" className="signBttn" onClick={handleSubmit}>Login</button>
      </div>
      <div>
        <p><b>First name: </b> {user ? user.first_name : "First Name"}</p>
        <p><b>Number of users: </b> {totalUsers}</p>
      </div>
    </>
  );
}
