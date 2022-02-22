import { getSession } from 'next-auth/client'
import React from 'react'
import FilterPlace from '../../components/Filter'
import Head from 'next/head'
import { BigJob } from '../../components/JobCard'
import { SeperatePrice } from '../../utils/format'
import Rating from '../../components/Rating'

export default function Search(props) {
    return (
        <div className='container'>
            <Head>
                <title>Search: {props.keyword}</title>
            </Head>
            <FilterPlace keyword={props.keyword}></FilterPlace>
            <div>
            <div className='title'>Từ khóa tìm kiếm: {props.keyword}</div>
            {props.jobsMeetRequire.length === 0 ? <div className='title-bh'>Xin lỗi chúng tôi không tìm thấy được công việc phù hợp với từ khóa của bạn</div> : ''}
            <div className='result-display'>
                
                {
                    props.jobsMeetRequire.map(job => (
                        <div key = {job._id} className = 'card'>
                        <a href = {`/jobs/${job._id}`}>
                        <img className = 'card-img-top' src = {`${process.env.API_URL}${job.coverImage.url}`} alt={job.name}></img>
                        
                        <div className = 'card-body'>
                            <a href = {`/jobs/${job._id}`}>
                                <div className='card-title'>{job.name}</div>
                                <div className='price'>Giá khởi đầu: {SeperatePrice(job.startingPrice)} VND</div>
                            </a>
                            {
                                job.rating.length > 0 ? <Rating rating = {job.rating[0].rating} numReviews ={job.rating.length}></Rating> : <Rating rating = {0} numReviews ={0}></Rating>
                            }
                        </div>
                        </a>
                        
                    </div>
                    ))  
                }
            </div>
            </div>

            <style jsx>
                {`
                .title-bh{
                    color: red;
                    margin: 5%;
                    font-size: 1.5rem;
                }
                .container {
                    display: grid;
                    grid-template-columns: .3fr 1fr;
                }
                .result-display{
                    display: grid;
                    grid-template-columns: 1fr 1fr ;
                    grid-template-rows: auto;
                    margin: 5%;
                }
                .card{
                    font-family: 'Raleway', sans-serif;
                    width: 15rem;
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

export const getServerSideProps = async({req, res, query}) => {
    const session = await getSession({ req });
    var keyword = query.keyword;
    var max = 0;
    if(query.max) {
        max = query.max;
    }
    var categoriesList = []
    if(query.category0) {
        categoriesList.push(query.category0);
    }
    if(query.category1) {
        categoriesList.push(query.category1);
    }
    if(query.category2) {
        categoriesList.push(query.category2);
    }
    if(query.category3) {
        categoriesList.push(query.category3);
    }
    if(query.category4) {
        categoriesList.push(query.category4);
    }
    if(query.category5) {
        categoriesList.push(query.category5);
    }
    
    //Now we need to get all the jobs for searching keyword in name or desc
    const jobs = await fetch(`${process.env.API_URL}/jobs`);
    const result = await jobs.json();

    keyword = keyword.toLowerCase();

    const jobsMeetRequire = []
    for(var i of result) {
        
        var name = i.name.toLowerCase();
        var desc = i.desc.toLowerCase();
        if(name.includes(keyword)) {
            if(max != 0) {
                if(i.startingPrice <= max) {
                    jobsMeetRequire.push(i);
                }
            }
            else{
                jobsMeetRequire.push(i);
            }
        }
        else {
            if(desc.includes(keyword)) {
                if(max != 0) {
                    if(i.startingPrice <= max) {
                        jobsMeetRequire.push(i);
                    }
                }
                else{
                    jobsMeetRequire.push(i);
                }
            }
        }
        
        
    }
    return {
        props: {
            session,
            keyword,
            jobsMeetRequire
        }
    }
}