import { useState } from 'react';
import { Link } from "react-router-dom";
import './SearchResultRow.css'

const SearchResultRow = ({item}) => {
    let imgSrc = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : "./src/Images/blank-book-cover_134452-8.png";
    const [img, setImg] = useState(imgSrc);

    const handleImageError = (e) => {
        e.target.onerror = null;
        setImg("../Images/blank-book-cover_134452-8.png")
    }

    return ( 
        <div className="result-container">
            <Link to={`/details/${item.id}`}>
                <img onError={handleImageError} src={img} alt={`The cover art for ${item.volumeInfo.title}`} />
            </Link>
            <div className='text-container'>
                <h2>{item.volumeInfo.title}</h2>
                <p>{item.volumeInfo.authors}</p>
                {item.volumeInfo.categories ? <p>{item.volumeInfo.categories}</p> : <p>　</p>}
            </div>
        </div>
    );
}
 
export default SearchResultRow;


