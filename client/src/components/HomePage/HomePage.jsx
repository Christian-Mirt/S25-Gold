import './HomePage.css'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return( 
    <div>
      <h2 className = "caption">Let&apos;s find your next favorite study spot!</h2>
      <button className="nextBttn">
        <span onClick = {() => {navigate("/signup")}} className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  )
}

export default HomePage;
