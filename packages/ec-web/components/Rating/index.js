import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons'


export default function Rating(props) {
    const {rating, numReviews} = props;
    return (
        <div className = "rating">
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 1 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 2 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 3 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 4 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 5 ? faStar : farStar}></FontAwesomeIcon></span>
            <span>{' ' + numReviews + ' reviews'}</span>
        </div>
    )
}
export const RatingComment = (props) => {
    const {rating, comment} = props;
    return (
        <div>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 1 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 2 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 3 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 4 ? faStar : farStar}></FontAwesomeIcon></span>
            <span><FontAwesomeIcon style={{width: '20px'}} icon={rating >= 5 ? faStar : farStar}></FontAwesomeIcon></span>
            <div className='comment'>{comment}</div>
        </div>
    )
}