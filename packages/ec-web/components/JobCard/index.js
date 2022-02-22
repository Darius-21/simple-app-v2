import React from 'react';
import Rating from '../Rating';
import { API_URL } from '../../utils/urls';
import { SeperatePrice } from '../../utils/format';

export default function Job(props) {
    const { job } = props;
    return (
        <div key = {job._id} className = 'card'>
            <a href = {`/jobs/${job._id}`}>
            <img className = 'card-img-top' src = {`${API_URL}${job.coverImage.url}`} alt={job.name}></img>
            
            <div className = 'card-body'>
                <a href = {`/jobs/${job._id}`}>
                    <div className='card-title'>{job.name}</div>
                    <div className='price'>Giá khởi đầu: {SeperatePrice(job.startingPrice)} VND</div>
                </a>
                {
                    job.rating.length != 0 ? (job.rating.length + ' reviews') : '0 review' 
                }
            </div>
            </a>
            <style jsx>
                {`
                .card{
                    font-family: 'Raleway', sans-serif;
                    width: 10rem;
                    color: black;
                    > *{
                        color: black;
                    }
                    a{
                        color: black;
                        text-decoration: none;
                    }
                    .price{
                        font-size: 1rem;
                        font-weight: 700;
                    }
                    margin-bottom: 50px;
                }
                `}
            </style>
        </div>
    )
}

export const BigJob = (props) => {
    const { job } = props;
    var avg_star = 0;
    var total_review = 0;
    if (job.rating.length > 0){
        for ( var i of job.rating) {
            avg_star += i.rating;
            ++total_review;
        }
    }
    if (total_review != 0) {
        avg_star /= total_review;
    }
    return (
        <div key = {job._id} className = 'card'>
            <a href = {`/jobs/${job._id}`}>
            <img className = 'card-img-top' src = {`${API_URL}${job.coverImage.url}`} alt={job.name}></img>
            
            <div className = 'card-body'>
                <a href = {`/jobs/${job._id}`}>
                    <div className='card-title'>{job.name}</div>
                    <div className='price'>Giá khởi đầu: {SeperatePrice(job.startingPrice)} VND</div>
                </a>
                {
                    total_review > 0 ? <Rating rating = {avg_star} numReviews ={total_review}></Rating> : <Rating rating = {0} numReviews ={0}></Rating>
                }
            </div>
            </a>
            <style jsx>
                {`
                .card{
                    font-family: 'Raleway', sans-serif;
                    width: 25rem;
                    color: black;
                    > *{
                        color: black;
                    }
                    a{
                        color: black;
                        text-decoration: none;
                    }
                    .price{
                        font-size: 1rem;
                        font-weight: 700;
                    }
                    margin-bottom: 50px;
                }
                `}
            </style>
        </div>
    )
}