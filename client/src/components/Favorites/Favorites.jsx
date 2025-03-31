import './Favorites.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const handlePlaceClick = (placeId) => {
        navigate(`/places/${placeId}`);
    };

    const removeFavorite = (placeId) => {
        const updatedFavorites = favorites.filter(favorite => favorite.id !== placeId);
        setFavorites(updatedFavorites);

        // Update localStorage
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites">
            <h1>Favorites</h1>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((favorite) => (
                        <li key={favorite.id} style={{listStyleType: 'none' }}>
                            <span onClick={() => handlePlaceClick(favorite.id)} style={{fontSize: '20px'}}>
                                {favorite.name}
                            </span>
                            <button 
                                onClick={() => removeFavorite(favorite.id)} 
                                style={{ marginLeft: '10px', marginBottom: '15px', cursor: 'pointer' }}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>
    );
}

export default Favorites;