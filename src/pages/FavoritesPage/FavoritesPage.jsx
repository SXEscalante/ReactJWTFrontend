import useAuth from "../../hooks/useAuth";

const FavoritesPage = ({}) => {
    const [user, token] = useAuth();

    return ( 
        <div>
            <h1>{user.userName}'s Favorites</h1>
        </div>
    );
}
 
export default FavoritesPage;