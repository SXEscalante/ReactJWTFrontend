import './Review.css'

const Review = ({review, user, deleteReview, setAllowNewReview, openEditModal, setReview}) => {
    let currentUser = false
    console.log(review)

    if (user){
        if (user.id === review.userId){
            currentUser = true;
            setAllowNewReview(false)
            setReview(review)
    }}

    return ( 
        <div className='review'>
            <div className="review-header">
                <h3 className='username'>{review.username}</h3>
                <div className='buttons-rating'>
                    {currentUser && <div>
                        <button className='delete' onClick={() => deleteReview(review.id)}>X</button>
                        <button className='edit' onClick={() => openEditModal(true)}></button>
                    </div>}
                    <p className='rating-value'>Rated: {review.rating}</p>
                </div>
            </div>
            <p className='body'>{review.text}</p>
            <br />
            <hr />
        </div>
    );
}
 
export default Review;