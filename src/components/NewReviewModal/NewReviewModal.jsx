import { useState, useEffect } from "react";

import "./NewReviewModal.css"

const NewReviewModal = ({ modalState, setModalState }) => {
    const [rating, setRating] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(rating > 10){
            setRating(10)
        }
    }, [rating]);

    if (!modalState) return null;
    return ( 
        <div className="overlay">
            <form className="modal">
                <button className="exit" onClick={() => setModalState(false)}>X</button>
                <div className="rating-container">
                    <label className="label">Rating</label>
                    <input className="rating" type="number" value={rating || ''} onChange={(e) => setRating(e.target.value)} />
                </div>
                <br />
                <div className="message-container">
                    <label className="label">Review message</label>
                    <textarea className="message" value={message || ''} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <button>Sumbit</button>
            </form>
        </div>
    );
}
 
export default NewReviewModal;