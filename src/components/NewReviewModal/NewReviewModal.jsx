import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import "./NewReviewModal.css"

const NewReviewModal = ({ modalState, setModalState, bookId }) => {
    const [user, token] = useAuth();
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');

    const handleNewReview = async (e) => {
        e.preventDefault();

        const ReviewData = {
            bookId: bookId,
            text,
            rating,
        }
  
        try{
            const responce = await axios.post(`https://localhost:5001/api/reviews`, ReviewData, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (responce.status === 201){
                setModalState(false)
            }
        } catch (error){
            console.log("Error reviewing book:", error)
        }
    }

    useEffect(() => {
        if(rating > 10){
            setRating(10)
        }
        else if(rating < 0){
            setRating(0)
        }
    }, [rating]);

    if (!modalState) return null;
    return ( 
        <div className="overlay">
            <form onSubmit={handleNewReview} className="modal">
                <button className="exit" onClick={() => setModalState(false)}>X</button>
                <div className="rating-container">
                    <label className="label">Rating</label>
                    <input className="rating" type="number" value={rating || ''} onChange={(e) => setRating(e.target.value)} />
                </div>
                <br />
                <div className="text-container">
                    <label className="label">Review message</label>
                    <textarea className="text" value={text || ''} onChange={(e) => setText(e.target.value)} />
                </div>
                <button type="submit">Sumbit</button>
            </form>
        </div>
    );
}
 
export default NewReviewModal;