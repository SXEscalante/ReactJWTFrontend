import './Review.css'

const Review = ({review, user}) => {
    let currentUser = false

    if (user.id === review.userId){
        currentUser = true;
    }

    return ( 
        <div className='review'>
            <div className="review-header">
                <h3 className='username'>{review.username}</h3>
                {currentUser && <div>
                    <button>X</button>
                    <button>E</button>
                    <p>Rated: {review.rating}</p>
                </div>}
            </div>
            <p className='body'>{review.text}</p>
            <br />
            <hr />
        </div>
    );
}
 
export default Review;