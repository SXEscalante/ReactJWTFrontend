import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import FavoriteDisplay from "../../components/FavoriteDisplay/FavoriteDisplay";

import "./FavoritesPage.css"

const FavoritesPage = ({}) => {
    const [user, token] = useAuth();
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    const getFavorites = async () => {
        try{
            const responce = await axios.get(`https://localhost:5001/api/favorites/myFavorites`, {
                headers: {
                  Authorization: "Bearer " + token
                }
            })
            if (responce.status === 200){
                console.log(responce.data)
                setFavoriteBooks(responce.data.map((book, i) => <FavoriteDisplay key={i} book={book}/>))
            }
        } catch (error){
            console.log("Error getting favorite books:", error)
          }
    }

    useEffect(() => {
        getFavorites();
      }, [])

    return ( 
        <div>
            <h1>{user.userName}'s Favorites</h1>
            <div className="favorites-container">
                {favoriteBooks}
            </div>
        </div>
    );
}
 
export default FavoritesPage;