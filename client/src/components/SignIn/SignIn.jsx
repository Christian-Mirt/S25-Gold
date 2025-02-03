import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const target_id = 2;
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const getUser = async () => {
    const formBody = JSON.stringify({ id: target_id });

    const result = await fetch(import.meta.env.VITE_API_KEY + '/user/', {
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
      method: "GET",
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await result.json();

    if (data.status === 200) {
      console.log(data);
      setTotalUsers(data.total_users);
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
          <input type="text" placeholder="Username" required className="user" /><br />
          <input type="password" placeholder="Password" required className="pass" /><br /><br />
          <label className="remember">
            <input id="rememberme" name="rememberme" value="remember" type="checkbox" />
            Remember Me
          </label><br />
          <a href="#" className="forgot">Forgot Password?</a>
        </form>
      </div>
      <h2 className="subtitle">Let's find your next favorite study spot!</h2>
      <div className="card">
        <button type="submit" className="signBttn">Login</button>
      </div>
      <div>
        <p><b>First name: </b> {user ? user.first_name : "First Name"}</p>
        <p><b>Number of users: </b> {totalUsers}</p>
      </div>
    </>
  );
}
