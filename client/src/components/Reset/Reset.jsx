import './Reset.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function Reset()
{
    return (
        <>
          <div className='center-vertically'>
            <div className='center-horizontally'>
              <div className="restInfo">
              <form action="">
                <h1 className="resetHeader">Reset Password</h1>
                <input type="password" name="newPassword" placeholder="New Password" required className="newPass"  /><br />
                <input type="password" name="confirmPassword" placeholder="Confirm New Password" required className="confirmPass"  /><br /><br />
              </form>
              </div>
              <h2>Let's find your next favorite study spot!</h2>
                <div className="card">
                    <button type="submit" className='resetBttn'>Reset Password</button>
                </div>
            </div>
          </div>
        </>
      );
}

export default Reset;