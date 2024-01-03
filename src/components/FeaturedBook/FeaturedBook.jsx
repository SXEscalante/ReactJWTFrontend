import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./FeaturedBook.css"

const FeaturedBook = ({book, genre}) => {
    let imgSrc = "./src/Images/blank-book-cover_134452-8.png"
    const [img, setImg] = useState(imgSrc)
    
    const handleImageError = (e) => {
        e.target.onerror = null;
        setImg("../Images/blank-book-cover_134452-8.png")
    }
    
    useEffect (() => {
        if(book && book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
            setImg (book.volumeInfo.imageLinks.thumbnail);
        }
    }, [book]);
    
    if(!book || !book.volumeInfo) return null

    return (
        <div className="recommended-book">
            <Link className="link" to={`/details/${book.id}`}>
                <p>{book.volumeInfo.title}</p>
                <img onError={handleImageError} src={img} alt={`The cover art for ${book.volumeInfo.title}`} />
            </Link>
            <p>{genre}</p>
        </div>
    );
}
 
export default FeaturedBook;