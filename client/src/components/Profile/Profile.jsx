import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

function Profile() {
  const navigate = useNavigate();
  const profilePicRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.onchange = function () {
      if (this.files.length > 0) {
        profilePicRef.current.src = URL.createObjectURL(this.files[0]);
      }
    };
  }, []);

  return (
    <div className="profileCatalog">
      <h1 className="profileTitle"><img src="about:blank" id="pfp" ref={profilePicRef} className='dot' />Your Profile</h1>
      <a href className='favs'>Your favorites</a><br /><br />
      <a href className='reviews'>Your Reviews</a><br /><br />
      <a href className='prefs'>Your Preferences</a><br /><br />
      <label for="input_file" className='profilePhoto'>Upload a Profile Photo</label>
      <input type="file" accept="image/*" id="input_file" ref={inputRef}></input>
    </div>
  )
}

export default Profile;