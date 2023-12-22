import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './BookDetailsPage.css'

const BookDetailsPage = ({}) => {
    const { bookId } = useParams();
    const [book, setBook] = useState('');
    const [loading, setLoading] = useState(true);
    console.log(useParams())
    
    const handleSearch = async () => {
        try {
          console.log(bookId)
          const responce = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
          if (responce.status === 200){
            console.log(responce.data)
            setBook(responce.data);
            setLoading(false)
          }
        } catch (error) {
          console.log("Error searching for bookId:", error)
          setLoading(false)
        }
    }

    useEffect(() => {
      handleSearch();
    }, [])

    if(loading) {
        return <div></div>
    }

    return ( 
        <div className="book-info">
            <img src={`${book.volumeInfo.imageLinks.thumbnail}`} alt="" />
            <div className="info">
                <p>{book.volumeInfo.title}</p>
                <p>{book.volumeInfo.authors}</p>
                <p>{book.volumeInfo.categories}</p>
                <p>{book.volumeInfo.description}</p>
            </div>
        </div>
    );
}
 
export default BookDetailsPage;