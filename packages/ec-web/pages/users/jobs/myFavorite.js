import React from 'react'
import { getSession } from 'next-auth/client'
import { BigJob } from '../../../components/JobCard'
import { useState, useContext } from 'react'
import AuthContext from '../../../context/AuthContext'

export default function myFavorite(props) {
    const { userProfile } = useContext(AuthContext);

    return (
        <div className='container'>
            <div className='title'>Những công việc bạn yêu thích</div>
            <div className='card-container'>
            {
                userProfile[0].favorite_jobs.length != 0 ? userProfile[0].favorite_jobs.map( job => (<BigJob job={job}></BigJob>)) : <div className='sm-title'>Xin lỗi chúng tôi không thể tìm thấy công việc yêu thích của bạn</div>
            }
            </div>

            <style jsx>
                {`
                .sm-title{
                    text-align: center;
                    font-size: 1.5rem;
                    font-style: italic;

                }
                .title{
                    margin-bottom: 5%;
                }
                .card-container{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: auto;
                }
                `}
            </style>
        </div>
    )
}

export const getServerSideProps = async({req}) => {
    const session = await getSession({ req });
    return {
        props: {
        session,
        },
    };
}