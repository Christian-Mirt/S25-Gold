import './Profile.css'
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const profilePicRef = useRef(null);
  const inputRef = useRef(null);

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
    if (id) {
      getUser(id);
    }

    if (inputRef.current) {
      inputRef.current.onchange = function () {
        if (this.files.length > 0) {
          profilePicRef.current.src = URL.createObjectURL(this.files[0]);
        }
      };
    }
  }, [id]);


  return (
    <div className="profileCatalog">
      <h1 className="profileTitle"><img src="about:blank" id="pfp" ref={profilePicRef} className='dot' />{user ? `Welcome, ${user.First_Name}!` : "Please login"}</h1>
      <a href className='favs'>Your favorites</a><br /><br />
      <a href className='reviews'>Your Reviews</a><br /><br />
      <a href className='prefs'>Your Preferences</a><br /><br />
      <label for="input_file" className='profilePhoto'>Upload a Profile Photo</label>
      <input type="file" accept="image/*" id="input_file" ref={inputRef}></input>
    </div>
  )
}

export default Profile;