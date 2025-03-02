import './Reset.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Reset()
{
    const navigate = useNavigate();
    const [enteredEmail, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();

        if (enteredEmail == "") {
            alert("Please enter a valid email address");
            return;
          }

          if (newPassword == "") {
            alert("Please enter a valid password");
            return;
          }

        const formBody = JSON.stringify({
          email: enteredEmail,
          password: newPassword
        })

        try {
            const result = await fetch(import.meta.env.VITE_API_KEY + '/reset/generateNewPass', {
              method: 'PUT',
              body: formBody,
              headers: {
                'content-type': 'application/json'
              }
            });
        
        const data = await result.json();

        if (data.status == 200) {
            console.log(data);
      
              navigate(`/signin`);
      
            } else {
              alert('Email or password is incorrect');
            }
          } catch (error) {
            console.error('Error changing password:', error);
            alert('Something went wrong. Please try again.');
          }
};

    return (
        <>
          <div className='center-vertically'>
            <div className='center-horizontally'>
              <div className="restInfo">
              <form action="">
                <h1 className="resetHeader">Reset Password</h1>
                <input type="email" name="email" placeholder="Email" required className="email" value={enteredEmail} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="password" name="new Password" placeholder="New Password" required className="newPass"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/><br /><br />
              </form>
              </div>
              <h2>Let's find your next favorite study spot!</h2>
                <div className="card">
                    <button type="submit" className='resetBttn' onClick={handleReset}>Reset Password</button>
                </div>
            </div>
          </div>
        </>
      );
}

export default Reset;