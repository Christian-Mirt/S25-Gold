import './Profile.css';
import PhotoUpload from "../PhotoUpload/PhotoUpload";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(''); 
  const navigate = useNavigate();
  const { id } = useParams();
  const profilePicRef = useRef(null);

  // Function to fetch user data
  const getUser = async (userId) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_KEY + `/user/${userId}`);
      const result = await response.json();

      if (response.ok) {
        setUser(result.data[0]);
      } else {
        console.error("Error fetching user:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Function to fetch profile photo
  const getProfilePic = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/user/${userId}/photo`);
      const data = await response.json();

      if (response.ok) {
        setProfilePicUrl(data.photoUrl); 
      } else {
        console.error("Error fetching photo:", data);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };


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


  useEffect(() => {
    if (!id) {
      alert("Please login to access the profile page!");
      navigate("/signin");
    } else {
      getUser(id); 
      getProfilePic(id); 
    }
  }, [id, navigate]);

  // Default profile image
  const profileImageUrl = profilePicUrl || "/default-profile.png"; 

  return (
    <div className="profileContainer">
      <div className="profileCatalog">
        <h1 className="profileTitle">
          <img
            src={profileImageUrl} 
            id="pfp"
            ref={profilePicRef}
            className="dot"
            alt="Profile"
          />
          {user ? `Welcome, ${user.first_name}!` : "Please login"}
        </h1>
        <a href="#" className="favs">Your favorites</a><br /><br />
        <a href="#" className="reviews">Your Reviews</a><br /><br />
        <a href="#" className="prefs">Your Preferences</a><br /><br />
        <PhotoUpload userId={id} /><br />
        <a href="#" className="resetPass" onClick={handleResetPass}>Reset your Password</a><br /><br />
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
  );
}

export default Profile;
