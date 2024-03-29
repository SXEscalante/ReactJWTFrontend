import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import FavoriteDisplay from "../../components/FavoriteDisplay/FavoriteDisplay";

import "./FavoritesPage.css"

const FavoritesPage = ({}) => {
    const [user, token] = useAuth();
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    const handleFavorites = async () => {
        try{
            const responce = await axios.get(`https://localhost:5001/api/favorites/myFavorites`, {
                headers: {
                  Authorization: "Bearer " + token
                }
            })
            if (responce.status === 200){
                console.log(responce.data)
                setFavoriteBooks(responce.data.map((book, i) => <FavoriteDisplay key={i} book={book} deleteFavorite={handleDeleteFavorite}/>))
            }
        } catch (error){
            console.log("Error getting favorite books:", error)
          }
    }

    const handleDeleteFavorite = async (id) => {
        try {
            const responce = await axios.delete(`https://localhost:5001/api/favorites/${id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (responce.status === 204) {
                handleFavorites();
            }
        } catch (error) {
            console.log("Error deleting favorite:", error)
        }
    }

    useEffect(() => {
        handleFavorites();
      }, [])

    return ( 
        <div>
            <h1>{user.userName}'s Favorites</h1>
            <div className="favorites-page">
                {favoriteBooks}
            </div>
        </div>
    );
}
 
export default FavoritesPage;