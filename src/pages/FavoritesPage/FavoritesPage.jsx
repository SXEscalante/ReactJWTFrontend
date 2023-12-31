import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const FavoritesPage = ({}) => {
    const [user, token] = useAuth();
    const [favoriteBooks, setFavoriteBooks] = useState({});

    const getFavorites = async () => {
        try{
            const responce = await axios.get(`https://localhost:5001/api/favorites/myFavorites`, {
                headers: {
                  Authorization: "Bearer " + token
                }
            })
            if (responce.status === 200){
                console.log(responce.data)
                setFavoriteBooks(responce)
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
            <div>

            </div>
        </div>
    );
}
 
export default FavoritesPage;