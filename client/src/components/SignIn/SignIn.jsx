import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const target_id = 1;
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const [formData, setFormData] = useState({
    first_name: '',
    password: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

  const getUser = async () => {
    const formBody = JSON.stringify({ id: target_id });

    const login = await fetch(import.meta.env.VITE_API_KEY + '/user/signIn', {
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

  const handleLogin = async () => {
    try {
        const response = await fetch('user/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            alert('Login successful! Redirecting...');
            navigate('/searchfilter');
        } else {
            alert(`Error: ${data.error || 'Login failed'}`);
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Something went wrong. Please try again.');
    }
};

  return (
    <>
      <div className="loginInfo">
        <form action="">
          <h1 className="loginHeader">Login</h1>
          <input type="text" name="first_name" placeholder="Username" required className="user" value={formData.first_name} onChange={handleChange}/><br />
          <input type="password" name="password" placeholder="Password" required className="pass" value={formData.password} onChange={handleChange}/><br /><br />
          <label className="remember">
            <input id="rememberme" name="rememberme" value="remember" type="checkbox" />
            Remember Me
          </label><br />
          <a href="#" className="forgot">Forgot Password?</a>
        </form>
      </div>
      <h2 className="subtitle">Let's find your next favorite study spot!</h2>
      <div className="card">
        <button type="submit" className="signBttn" onClick={handleLogin}>Login</button>
      </div>
      <div>
        <p><b>First name: </b> {user ? user.first_name : "First Name"}</p>
        <p><b>Number of users: </b> {totalUsers}</p>
      </div>
    </>
  );
}
