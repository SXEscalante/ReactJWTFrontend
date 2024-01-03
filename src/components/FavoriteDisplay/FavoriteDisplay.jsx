import { Link } from "react-router-dom";
import axios from "axios";

import "./FavoriteDisplay.css"

const FavoriteDisplay = ({ book, deleteFavorite}) => {
    

    return ( 
        <div className="favorite-display">
            <button className="delete-favorite" onClick={() => deleteFavorite(book.id)}>X</button>
                <Link to={`/details/${book.bookId}`}>
                    <img src={book.thumbnailUrl} alt="" />
                    <p className="title">{book.title}</p>
                </Link>
        </div>
    );
}
 
export default FavoriteDisplay;