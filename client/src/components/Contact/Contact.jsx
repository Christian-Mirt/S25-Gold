import './Contact.css'
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  return( 
    <div className="contactCatalog">
      <h1 className = "profileTitle">Your Profile</h1>
      <a href className='favs'>Your favorites</a><br/>
      <a href className='reviews'>Your Reviews</a><br/>
      <a href className='prefs'>Your Preferences</a><br/>
      <a href className='profilePhoto'>Upload a Profile Photo</a>
    </div>
  )
}

export default Contact;