import './SignIn.css'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function SignIn() {

  const navigate = useNavigate();
  const target_id = 1;
  const [user, setUser] = useState(null);

  const getUser = async (userId) => {

    const formBody = JSON.stringify({
      id: target_id,
    })

    const result = await fetch(import.meta.env.VITE_API_KEY + '/user/:id', {
      method: "POST",
      body: formBody,
      headers: {
        'content-type': 'application/json'
      }
    });

    const data = await result.json();

    if (data.status == 200) {
      setUser(data.data[0]);
      console.log(data);
    } else {
      console.log("Error fetching user");
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

