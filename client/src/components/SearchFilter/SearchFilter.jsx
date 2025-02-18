import './SearchFilter.css'
import { useNavigate } from 'react-router-dom';

function SearchFilter() {
  const navigate = useNavigate();

  const searchPlace = () =>{
    navigate('/places');
  }

  return( 
    <div className='center-vertically'>
      <div className='center-horizontally'>
        <input type="text" placeholder="Search for a place..." className = "bigSearch"></input>
        <h1 className='browseHeader'>Or browse using the filters below</h1>
        <select type="text" placeholder="Rating" className = "rating">
          <option value="" selected disabled>Rating</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <select type="text" placeholder="Hours" className = "hours">
          <option value="" selected disabled>Hours</option>
          <option value="1">Option 1</option>
        </select>
        <select type="text" placeholder="Wifi" className = "wifi">
          <option value="" selected disabled>Wifi</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="ok">Okay</option>
          <option value="slow">Slow</option>
          <option value="really_slow">Really Slow</option>
        </select>
        <select type="text" placeholder="Location" className = "loc">
          <option value="" selected disabled>Location</option>
          <option value="1">Option 1</option>
        </select>
        <select type="text" placeholder="Popular Times" className = "pop">
          <option value="" selected disabled>Popular Times</option>
          <option value="1">Option 1</option>
        </select>
        <select type="text" placeholder="Food & Drink" className = "food">
          <option value="" selected disabled>Food & Drink</option>
          <option value="1">Option 1</option>
        </select>
        <button className='searchButton' onClick={searchPlace}>Search</button>
      </div>
    </div>
  )
}

export default SearchFilter;