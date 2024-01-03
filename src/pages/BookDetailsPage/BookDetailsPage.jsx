import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './BookDetailsPage.css'
import NewReviewModal from "../../components/NewReviewModal/NewReviewModal";
import Review from "../../components/Review/Review";

const BookDetailsPage = ({}) => {
    const { bookId } = useParams();
    const [book, setBook] = useState('');
    const [bookDetails, setBookDetails] = useState('');
    const [loading, setLoading] = useState(true);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [user, token] = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isFavorited, setIsFavorited] = useState('');
    console.log("book",bookDetails)

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

    const handleReviews = async () => {
        try {
          const responce = await axios.get(`https://localhost:5001/api/bookDetails/${bookId}`, {
            headers: {
              Authorization: "Bearer " + token
            }})
  
          if(responce.status === 200){
            setBookDetails(responce.data)
          }
      } catch (error) {
        console.log("Error searching API for bookId:", error)
      }
    }

    const handleDeleteReview = async (reviewId) => {
      if (reviewId){
        try {
        const responce = await axios.delete(`https://localhost:5001/api/reviews/${reviewId}`, {
          headers: {
            Authorization: "Bearer " + token
          }})

          if (responce.status === 204){
            handleReviews();
          }
        } catch (error) {
          console.log("Error deleting review:", error)
        }
      }
    }

    const handleFavorite = async () => {
      const favData = {
        bookId: bookId,
        title: book.volumeInfo.title,
        thumbnailUrl: book.volumeInfo.imageLinks.thumbnail
      }
      try{
        const responce = await axios.post(`https://localhost:5001/api/favorites/${bookId}`, favData, {
          headers: {
            Authorization: "Bearer " + token
          }})
          handleReviews();
      } catch (error){
        console.log("Error favoriting book:", error)
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

    const canOpenModal = () => {
      if(user){
        setOpenModal(true)
      }
      else {
        setNotLoggedIn(true);
      }
    }

    useEffect(() => {
      handleSearch();
      handleReviews();
    }, [])

    useEffect(() => {
      handleReviews();
    }, [openModal, ])
    
    useEffect(() => {
      
    }, []);

    useEffect(() => {
      if(bookDetails || bookDetails != ''){
        setReviews(bookDetails.reviews.map((review, i) => <Review key={i} review={review} user={user} deleteReview={handleDeleteReview}/>))
      }
    }, [bookDetails]);

    const favorited = bookDetails.favorite ? "favorite" : "not-favorited"


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
                    <button onClick={detectUser} className={`favorite-button ${favorited}`}></button>
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
            <div>
              {reviews}
            </div>
            <button onClick={canOpenModal}>Write your own review</button>
        </div>
        <NewReviewModal modalState={openModal} setModalState={setOpenModal} bookId={bookId}  />
      </div>
    );
}
 
export default BookDetailsPage;