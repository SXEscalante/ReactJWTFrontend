import { Link } from "react-router-dom";

import "./FavoriteDisplay.css"

const FavoriteDisplay = ({book}) => {
    return ( 
        <div className="favorite-display">
            <button className="delete-favorite">X</button>
                <Link to={`/details/${book.bookId}`}>
                    <img src={book.thumbnailUrl} alt="" />
                    <p>{book.title}</p>
                </Link>
        </div>
    );
}
 
export default FavoriteDisplay;