import './Review.css';
import { useState, useEffect } from 'react';

function Review() {
  const [allReviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  
    //fetch user data
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
  
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        getUser(userId);
    }, []);

  // Get a specific user's reviews
  const getReviews = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId here
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_KEY + '/retrieveReviews?user_id=' + userId, {
        method: "GET",
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    getReviews(); 
  }, []);

  return (
    <div className="userReviews">
      <h1>My Reviews</h1>

      <div className="reviewList">
        <ul>
          {allReviews && allReviews.map((review, index) => (
            <li key={index}>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Review;