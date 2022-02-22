import Head from "next/dist/next-server/lib/head";
import Link from 'next/link';
import React from 'react'
import ProfileCard from "../../../components/ProfileCard";
import { Form, Row, Col, Carousel } from 'react-bootstrap'
import { useState } from 'react';
import { useContext } from "react";
import HeaderContext from "../../../context/HeaderContext";
import Router from 'next/router'


const JobSeekingDetail = (props) => {
    const {userProfile} = useContext(HeaderContext);
    if(userProfile){
        const user = userProfile[0].user;
    }
    else{
        const user = null;
    }


    return (
        <div className='content-container'>
            <Head>
                {
                    props.job.meta_title &&
                        <title>{props.job.meta_title}</title>
                }
                {
                    props.job.meta_desc &&
                        <meta name='desc' content={props.job.meta_desc}></meta>
                }
            </Head>
            <div className='banner-container' >
            
            </div>
            <div className='container'>
                <div className='img-desc'>
                    <Carousel>
                        {
                            props.job.coverImage ? (
                                <Carousel.Item interval={1500}>
                                    <img src = {process.env.API_URL + props.job.coverImage.url}
                                        alt= 'Cover Image'
                                        className = 'd-block w-100'
                                    />
                                </Carousel.Item>
                            ) : ''
                        }
                        {
                            props.job.Image ? (
                                props.job.Image.map(image => (
                                    <Carousel.Item interval={1500}>
                                        <img src={process.env.API_URL + image.url}
                                            alt='Image'
                                            className = 'd-block w-100'
                                        />
                                    </Carousel.Item>
                                ))
                            ) : ''
                        }
                    </Carousel>
                    <div className='desc'>
                        <div className='title'>
                            {props.job.name}
                        </div>
                        <div className='desc-details'>
                            {props.job.desc}
                        </div>
                        <div className='time'>
                            Thời gian cần để hoàn thành: {props.job.timeFinish + ' '+ props.job.timeFinishUnit}
                        </div>
                        
                        
                    </div>
                    <div className='profile'>
                        <ProfileCard profile={props.job.profile}></ProfileCard>
                    </div>
                </div>
                
            </div>
                <style jsx>
                    {`
                    .title{
                        font-size: 2rem;
                        font-weight: 700;
                    }
                    .img-desc{
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto;
                        .desc{
                            width: 90%;
                            margin: auto;
                            div{
                                margin-top: 5%;
                            }
                        }
                    }
                    .profile{
                        margin-top: 10%;
                        width: 100%;
                    }
                    `}
                </style>
        </div>
    )
}

export async function getStaticProps({ params: { id } }) {
     const job_res = await fetch(`${process.env.API_URL}/job-seekers/?id=${id}`);
     const found = await job_res.json();
     return {
        props: {
           job: found[0],
           
        }
    }
     

    }



export async function getStaticPaths() {
    //Retrive all the possible paths
    const jobs_res = await fetch(`${process.env.API_URL}/job-seekers`);
    const jobs = await jobs_res.json();

    const paths = jobs.map(job => {
        return {
            params: {
                id: String(job._id)
            }
        }
    })
    
    //Return them to NextJS context
    return {
        paths,
        fallback: false
    }
}

export default JobSeekingDetail;