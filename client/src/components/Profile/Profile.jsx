import './Profile.css'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const profilePicRef = useRef(null);
  const inputRef = useRef(null);

  const handleReviewSubmit = async (e) => {
    try {
      if (response.ok) {
        alert('Review submitted successfully!');
      } else {
        console.error('Error submitting review:', await response.json());
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleResetPass = async (e) => {
    navigate(`/reset`);
  }

  const getUser = async () => {

    const response = await fetch(import.meta.env.VITE_API_KEY + '/user/auth/session', {
      credentials: 'include'
    });

    const result = await response.json();

    if (result.status == 200) {
      setUser(result.data);
    } else {
      console.error("Error fetching user:", result);
      navigate("/signin");
    }
  };

  useEffect(() => {
    getUser();

    if (inputRef.current) {
      inputRef.current.onchange = function () {
        if (this.files.length > 0) {
          profilePicRef.current.src = URL.createObjectURL(this.files[0]);
        }
      };
    }

  }, []);


  return (
    <div className="profileContainer">
      <div className="profileCatalog">
        <h1 className="profileTitle"><img src="/default-profile.png" id="pfp" ref={profilePicRef} className='dot' />{user ? `Welcome, ${user.first_name}!` : "Please login"}</h1>
        <a href className='favs'>Your favorites</a><br /><br />
        <a href className='reviews'>Your Reviews</a><br /><br />
        <a href className='prefs'>Your Preferences</a><br /><br />
        <label for="input_file" className='profilePhoto'>Upload a Profile Photo</label>
        <input type="file" accept="image/*" id="input_file" ref={inputRef}></input><br /><br />
        <a href className='resetPass' onClick={handleResetPass}>Reset your Password</a><br /><br />
      </div>

      <div className="reviewCatalog">
        <h2>Submit a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <div>
            <label htmlFor="reviewTitle">Place:</label>
            <input
              type="text"
              id="reviewTitle"
              required
            />
          </div>
          <div>
            <label htmlFor="reviewContent">Content:</label>
            <textarea
              id="reviewContent"
              required
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              min="0"
              max="5"
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  )
}

export default Profile;