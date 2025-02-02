import './SearchFilter.css'
import { useNavigate } from 'react-router-dom';

function SearchFilter() {
  const navigate = useNavigate();

  return( 
    <div>
      <input type="text" placeholder="Search for a place..." className = "bigSearch"></input>
      <h1 className='browseHeader'>Or browse using the filters below</h1>
      <input type="text" placeholder="Rating" className = "rating"></input>
      <input type="text" placeholder="Hours" className = "hours"></input>
      <input type="text" placeholder="Wifi" className = "wifi"></input>
      <input type="text" placeholder="Location" className = "loc"></input>
      <input type="text" placeholder="Popular Times" className = "pop"></input>
      <input type="text" placeholder="Food & Drink" className = "food"></input>
      <button className='searchButton'>Search</button>
    </div>
  )
}

export default SearchFilter;