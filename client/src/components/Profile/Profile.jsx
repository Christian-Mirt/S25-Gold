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
  const [reviewPlace, setReviewPlace] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(0);
  const [placeId, setPlaceId] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/place/catalogs`);
        const data = await response.json();
        if (data.status === 200) {
          setPlaces(data.data);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchPlaces();
  }, []);

  const findPlaceId = (placeName) => {
    let matchedPlace = places.find(place => 
      place.name.toLowerCase() === placeName.toLowerCase()
    );

    if (!matchedPlace) {
      matchedPlace = places.find(place => 
        place.name.toLowerCase().includes(placeName.toLowerCase())
      );
    }

    console.log('Input place name:', placeName);
    console.log('Matched place:', matchedPlace);

    return matchedPlace ? matchedPlace.place_id : null;
  };

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

  const handlePlaceChange = (e) => {
    const inputPlace = e.target.value;
    setReviewPlace(inputPlace);

    const foundPlace = findPlace(inputPlace);
    if (foundPlace) {
      setSelectedPlaceId(foundPlace.place_id);
      console.log('Selected Place ID:', foundPlace.place_id);
    } else {
      setSelectedPlaceId(null);
    }
  };


  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlaceId) {
      alert("Please select a valid place.");
      return;
    }

    const reviewData = {
      place_id: selectedPlaceId,
      user_id: id,
      num_stars: rating,
      comment: reviewContent,
    };

    console.log("Submitting review:", reviewData);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/place/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

    const result = await response.json();
    console.log("Response from server:", result);

      if (response.ok) {
        console.log("Review submitted successfully!");
        alert('Review submitted successfully!');
        setReviewPlace('');
        setReviewContent('');
        setRating(0);
        setSelectedPlaceId(null);
      } else {
        console.error('Error submitting review:', result);
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while submitting the review. Please check your connection.');
    }
  };


  const handleResetPass = async (e) => {
    navigate(`/reset/${id}`);
  }

  const handleFavorites = async (e) => {
    navigate(`/favorites/${id}`);
  }

  const handlePlaces = async (e) => {
    navigate(`/places/${id}`);
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
        <a href="#" className="places" onClick={handlePlaces}>All places</a><br /><br />
        <a href="#" className="favs" onClick={handleFavorites}>Your favorites</a><br /><br />
        <a href="#" className="reviews">Your Reviews</a><br /><br />
        <a href="#" className="prefs">Your Preferences</a><br /><br />
        <PhotoUpload userId={id} /><br />
        <a href="#" className="resetPass" onClick={handleResetPass}>Reset your Password</a><br /><br />
      </div>

      <div className="reviewCatalog">
        <h2>Submit a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <div>
            <label htmlFor="reviewPlace">Place:</label>
            <input
              type="text"
              id="reviewPlace"
              value={reviewPlace}
              onChange={handlePlaceChange}
              list="placesList"
              required
            />
            <datalist id="placesList">
            {places.map((place) => (
                <option key={place.place_id} value={place.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="reviewContent">Content:</label>
            <textarea
              id="reviewContent"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              min="1"
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
