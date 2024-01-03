import { useState } from 'react';
import { Link } from "react-router-dom";
import blankCover from "../../Images/blank-book-cover_134452-8.png"


import './SearchResultRow.css'

const SearchResultRow = ({item}) => {
    let imgSrc = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : blankCover;
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
            <div className='information-container'>
                <Link className="title-link" to={`/details/${item.id}`}>
                    <h2>{item.volumeInfo.title}</h2>
                </Link>
                <p>{item.volumeInfo.authors}</p>
                {item.volumeInfo.categories ? <p>{item.volumeInfo.categories}</p> : <p>　</p>}
            </div>
        </div>
    );
}
 
export default SearchResultRow;



