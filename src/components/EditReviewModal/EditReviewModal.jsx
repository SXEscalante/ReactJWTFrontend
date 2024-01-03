import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const EditReviewModal = ({modalState, setModalState, review}) => {
    const [user, token] = useAuth();
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');

    const handleEditReview = async (e) => {
        e.preventDefault();

        const ReviewData = {
            text,
            rating,
        }
  
        try{
            const responce = await axios.put(`https://localhost:5001/api/reviews/${review.id}`, ReviewData, {
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
        setRating(review.rating)
        setText(review.text)
    }, []);

    if(modalState == false) return null 
    return ( 
        <div className="overlay">
            <form onSubmit={handleEditReview} className="modal">
                <button className="exit" onClick={() => setModalState(false)}>X</button>
                <div className="modal-container">
                    <div className="rating-container">
                        <label className="label">Rating</label>
                        <input className="rating" type="number" value={rating || ''} onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <br />
                    <div className="text-container">
                        <label className="label">Review message</label>
                        <textarea className="text" rows={7} value={text || ''} onChange={(e) => setText(e.target.value)} />
                    </div>
                    <button className="submit" type="submit">Sumbit</button>
                </div>
            </form>
        </div>
    );
}
 
export default EditReviewModal;