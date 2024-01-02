import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './BookDetailsPage.css'
import NewReviewModal from "../../components/NewReviewModal/NewReviewModal";

const BookDetailsPage = ({}) => {
    const { bookId } = useParams();
    const [book, setBook] = useState('');
    const [bookDetails, setBookDetails] = useState('');
    const [loading, setLoading] = useState(true);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [user, token] = useAuth();
    const [openModal, setOpenModal] = useState(false);


    const handleSearch = async () => {
      try {
        console.log(bookId)
        const responce = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        if (responce.status === 200){
          setBook(responce.data);
          setLoading(false)
        }
      } catch (error) {
        console.log("Error searching for bookId:", error)
        setLoading(false)
      }
    }

    const handleComments = async () => {
        try {
          const responce = await axios.get(`https://localhost:5001/api/bookDetails/${bookId}`)
          if(responce.status === 200){
            setBookDetails(responce.data)
            console.log("Details", responce.data)
          }
      } catch (error) {
        console.log("Error searching API for bookId:", error)
      }
    }

    const detectUser = () => {
      if(user){
        handleFavorite()
      }
      else {
        setNotLoggedIn(true);
      }
    }

    const handleFavorite = async () => {
      const favData = {
        bookId: bookId,
        title: book.volumeInfo.title,
        thumbnailUrl: book.volumeInfo.imageLinks.thumbnail
      }

      try{
        await axios.post(`https://localhost:5001/api/favorites`, favData, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
      } catch (error){
        console.log("Error favoriting book:", error)
      }
    }

    useEffect(() => {
      handleSearch();
      handleComments();
    }, [])


    if(loading) {
        return <div></div>
    }

    return ( 
      <div>
        <div className="book-info">
            <img src={`${book.volumeInfo.imageLinks.thumbnail}`} alt="" />
            <div className="info">
                <div className="info-header">
                    <h2>{book.volumeInfo.title}</h2>
                    <p>Author: {book.volumeInfo.authors}</p>
                    <button onClick={detectUser} className={`favorite`}></button>
                </div>
                {notLoggedIn && <Navigate to="/login" />}
                <hr />
                <p className="genres">{book.volumeInfo.categories}</p>
                <p>Description: </p>
                <p>{book.volumeInfo.description}</p>
            </div>
        </div>
        <div className="comment-section">
            <h3>Comments</h3>
            <button onClick={() => setOpenModal(true)}>Write your own review</button>
        </div>
        <NewReviewModal modalState={openModal} setModalState={setOpenModal}/>
      </div>
    );
}
 
export default BookDetailsPage;